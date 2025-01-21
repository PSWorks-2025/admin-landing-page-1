import "./Art.css";

export function Art({ title, imageUrl, url, onDelete, id }) {
  return (
    <div className="grid-item" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="tag flex flex-row">
        <div className="title">{title}</div>
        <button onClick={() => onDelete(id)}>X</button>
      </div>
    </div>
  );
}

export function AddArtButton({ onClick }) {
  return (
    <button
      className="grid-item bg-gray-300 flex items-center justify-center"
      onClick={onClick}
    >
      <img
        width="100"
        height="100"
        src="https://cdn-icons-png.flaticon.com/512/2661/2661440.png"
        alt="plus"
      />
    </button>
  );
}

export function EditArtScreen({ isHidden, onDone, onCancel }) {
  return (
    <div className="art-edit-screen" hidden={isHidden}>
      <div className="art-edit-form">
        <h1 className="text-xl text-center font-bold">Edit</h1>
        <hr />
        <input
          type="text"
          name="title"
          id="art-title-edit"
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="imageUrl"
          id="art-image-url-edit"
          placeholder="Image URL"
        />
        <span> or </span>
        <input type="file" id="art-file-edit" accept="image/*" />
        <input
          type="text"
          name="redirectUrl"
          id="art-redirect-url-edit"
          placeholder="Redirect URL"
        />
        <br />
        <div className="flex flex-row">
          <button
            type="submit"
            className="transition duration-300 grow text-center mx-2 bg-blue-500 hover:bg-blue-400 text-white rounded"
            onClick={onDone}
          >
            Done
          </button>
          <button
            type="submit"
            className="transition duration-300 grow text-center rounded hover:bg-gray-200 mx-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
