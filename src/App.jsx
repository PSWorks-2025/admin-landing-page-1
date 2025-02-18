import React, { useState, useRef, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getDocs,
  doc,
  updateDoc,
  query,
  collection,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from './service/firebaseConfig';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from './components/Column';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './App.css';
import { AddArtButton, Art, EditArtScreen } from './Art';
import Input from './components/Input';
import BioData from './components/BioData';
import BioForm from './components/BioForm';

function ConvertArrToObj(arr) {
  let obj = {};
  arr.forEach((item, index) => {
    obj[`item_${index}`] = item;
  });
  return obj;
}

function ConvertObjToArr(Obj) {
  let arr = [];
  Object.entries(Obj)
    .map((item) => [item[0].slice(5), item[1]])
    .sort((a, b) => a[0] - b[0])
    .forEach(([key, value]) => {
      arr.push(value);
    });
  return arr;
}

function ConvertArrToObjArts(arr) {
  let obj = {};
  arr.forEach((item, index) => {
    obj[`art_${index}`] = item;
  });
  return obj;
}

function ConvertObjToArrArts(Obj) {
  let arr = [];
  Object.entries(Obj)
    .map((item) => [item[0].slice(4), item[1]])
    .sort((a, b) => a[0] - b[0])
    .forEach(([key, value]) => {
      arr.push(value);
    });
  return arr;
}

function App() {
  const [user, setUser] = useState();
  const [uid, setUID] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [arts, setArts] = useState([]);
  const [news, setNews] = useState({});
  const [bio, setBio] = useState({});
  const [isRequestToAddArt, setRequestToAddArt] = useState(false);

  const handleAddArtRequest = () => {
    setRequestToAddArt(true);
  };

  const handleDeleteArt = (artId) => {
    setArts((prevArts) => prevArts.filter((art) => art.id !== artId));
  };

  const handleDoneAddArt = () => {
    const title = document.getElementById('art-title-edit').value;
    const imageInput = document.getElementById('art-image-url-edit');
    const imageFile = document.getElementById('art-file-edit');
    const date = document.getElementById('art-date-edit').value;
    const description = document.getElementById('art-description-edit').value;

    let imageUrl = imageInput.value;

    if (imageFile.files && imageFile.files[0]) {
      const file = imageFile.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setArts((prevArts) => [
          {
            title: title,
            imageUrl: base64Image,
            date: date,
            description:description,
            id: prevArts.length + 1,
          },
          ...prevArts,
        ]);
        clearInputs();
      };
      reader.readAsDataURL(file);
    } else if (imageUrl) {
      setArts((prevArts) => [
        {
          title: title,
          imageUrl: imageUrl,
          date: date,
          description:description,
          id: prevArts.length + 1,
        },
        ...prevArts,
      ]);
      clearInputs();
    }

    setRequestToAddArt(false);
  };

  const handleCancelAddArt = () => {
    clearInputs();
    setRequestToAddArt(false);
  };

  const clearInputs = () => {
    document.getElementById('art-title-edit').value = '';
    document.getElementById('art-image-url-edit').value = '';
    document.getElementById('art-file-edit').value = '';
    document.getElementById('art-redirect-url-edit').value = '';
  };
  const addTask = (newImageData) => {
    setGallery((prevGallery) => [
      {
        ...newImageData,
        id: prevGallery.length + 1,
      },
      ...prevGallery,
    ]);
  };

  const getGalleryPos = (id) =>
    gallery.findIndex((galleryItem) => galleryItem.id === id);

  const handleSignIn = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await signInWithEmailAndPassword(auth, email, password);
  };
  const saveGallery = async () => {
    try {
      const userDocRef = doc(db, 'admin', uid);
      const galleryDocRef = doc(userDocRef, 'data', 'gallery');
      const res = ConvertArrToObj(gallery);
      await setDoc(galleryDocRef, { data: res });
      console.log('Gallery saved');
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };
  const saveNews = async () => {
    try {
      const userDocRef = doc(db, 'admin', uid);
      const newsDocRef = doc(userDocRef, 'data', 'news');
      await setDoc(newsDocRef, { data: news });
      console.log('News saved');
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };
  const saveArts = async () => {
    try {
      const userDocRef = doc(db, 'admin', uid);
      const artsDocRef = doc(userDocRef, 'data', 'arts');
      const res = ConvertArrToObjArts(arts);
      await setDoc(artsDocRef, { data: res });
      console.log('Arts saved');
    } catch (error) {
      console.error('Error saving arts:', error);
    }
  };
  const saveBio = async () => {
    try {
      const userDocRef = doc(db, 'admin', uid);
      const bioDocRef = doc(userDocRef, 'data', 'bio');
      await setDoc(bioDocRef, { data: bio });
      console.log('Bio saved');
    } catch (error) {
      console.error('Error saving bio:', error);
    }
  };
  const fetchData = async (uid) => {
    try {
      const userDocRef = doc(db, 'admin', uid);
      const subCollectionRef = collection(userDocRef, 'data');
      const querySnapshot = await getDocs(subCollectionRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const res = ConvertObjToArr(data.data);
        const res2 = ConvertObjToArrArts(data.data);
        if (doc.id === 'gallery' && data && data.data) {
          setGallery(res);
        } else if (doc.id === 'arts' && data && data.data) {
          setArts(res2);
        } else if (doc.id === 'news' && data && data.data) {
          setNews(data.data);
        } else if (doc.id === 'bio' && data && data.data){
          console.log(data.data);
          setBio(data.data);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUID(currentUser.uid);
      if (currentUser) {
        fetchData(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setGallery((gallery) => {
      const originalPos = getGalleryPos(active.id);
      const newPos = getGalleryPos(over.id);

      return arrayMove(gallery, originalPos, newPos);
    });
  };

  const sensors = useSensor(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDelete = (id) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  const deleteEvent = (year, eventId) => {
    setNews((prevEvents) => {
      const newEvents = { ...prevEvents };
      if (newEvents[year]) {
        delete newEvents[year][eventId];

        if (Object.keys(newEvents[year]).length === 0) {
          delete newEvents[year];
        }
      }
      return newEvents;
    });
  };

  const addEvent = ({ year, title, day, month,image, description }) => {
    setNews((prevEvents) => {
      const newEvents = { ...prevEvents };
      if (!newEvents[year]) {
        newEvents[year] = {};
      }
      const eventId = `event_${Object.keys(newEvents[year]).length}`;
      newEvents[year][eventId] = { title, day, month, imageUrl: image,description,date:`${day}-${month}-${year}` };
      return newEvents;
    });
  };

  const deleteSection = (sectionKey) => {
    // Create a copy of the existing sections
    const updatedSections = { ...bio };
    // Remove the specified section
    delete updatedSections[sectionKey];

    const newSections = {};
    let accumulatedHeight = 200;
    let newIndex = 0;

    Object.entries(updatedSections).forEach(([key, section]) => {
      const newKey = `section_${newIndex}`;
      const newParts = { ...section.parts };

      Object.entries(newParts).forEach(([partKey, part]) => {
        if (part.scrollEffectType) {
          part.startEffect = accumulatedHeight;
          part.rangeEffect = parseInt(section.height);
        }
      });

      newSections[newKey] = {
        ...section,
        parts: newParts,
      };

      accumulatedHeight += parseInt(section.height);
      newIndex++;
    });

    setBio(newSections);
  };
  const addSection = (height, overlay, newSectionData) => {
    console.log(newSectionData);
    
    const sectionCount = Object.keys(bio).length;
    const newSectionKey = `section_${sectionCount}`;

    // Calculate cumulative height only for existing sections
    const cumulativeHeight = Object.keys(bio).reduce((acc, key) => {
      return acc + parseInt(bio[key].height);
    }, 0);

    // Calculate the startEffect for the new section
    const startEffect = sectionCount === 0 ? 200 : cumulativeHeight + 200;

    const newSection = {
      height,
      overlay,
      parts: {},
    };

    newSectionData.parts.forEach((part, index) => {
      newSection.parts[`part_${index}`] = {
        ...part,
        startEffect, // Set the same startEffect for all parts
        rangeEffect: parseInt(height),
      };
    });

    setBio((prevBio) => ({
      ...prevBio,
      [newSectionKey]: newSection,
    }));

    console.log(newSection);
    
  };

  return (
    <>
      {!user ? (
        <div className="container">
          <div className="login-box">
            <div className="login-header">
              <header>Login</header>
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Email"
                autoComplete="off"
                required
                id="email"
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                autoComplete="off"
                required
                id="password"
              />
            </div>
            <div className="forgot">
              <section>
                <input type="checkbox" id="check" />
                <label htmlFor="check">Remember me</label>
              </section>
              <section>
                <a href="#">Forgot password</a>
              </section>
            </div>
            <div className="input-submit">
              <button className="submit-btn" id="submit" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <h1 className="font-bold text-2xl">Admin page</h1>
          <h2>Gallery</h2>

          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <button
              onClick={saveGallery}
              className="text-white rounded-lg bg-blue-500 py-2 px-4"
            >
              Save changes
            </button>
            <Column data={gallery} onDelete={handleDelete} />
            <Input onSubmit={addTask} />
          </DndContext>

          <h2 className="font-bold text-xl">Arts</h2>
          <button
            onClick={saveArts}
            className="text-white rounded-lg bg-blue-500 py-2 px-4"
          >
            Save changes
          </button>
          <hr className="border-black" />

          <div className="arts-container">
            <div id="arts-grid" className="arts-grid">
              <AddArtButton onClick={handleAddArtRequest} />
              {arts.map((item, index) => (
                <Art
                  onDelete={handleDeleteArt}
                  key={index}
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
            <EditArtScreen
              isHidden={!isRequestToAddArt}
              onDone={handleDoneAddArt}
              onCancel={handleCancelAddArt}
            />
          </div>

          <h2 className="mt-4">News</h2>
          <button
            onClick={saveNews}
            className="text-white rounded-lg bg-blue-500 py-2 px-4"
          >
            Save changes
          </button>
          <EventForm addEvent={addEvent} />
          <EventList events={news} deleteEvent={deleteEvent} />

          <h2 className="mt-4">Bio</h2>
          <button
            onClick={saveBio}
            className="text-white rounded-lg bg-blue-500 py-2 px-4"
          >
            Save changes
          </button>

          <BioForm addSection={addSection} />
          <BioData Bio={bio} onDelete={deleteSection} />
        </div>
      )}
    </>
  );
}

export default App;
