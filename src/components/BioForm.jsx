import React, { useState } from "react";

const scrollEffects = [
  "scroll-from-left",
  "scroll-from-right",
  "scroll-from-top",
  "scroll-from-bottom",
  "pop-from-center",
  "slowly-move-up",
  "slowly-zooming",
];

function BioForm({ addSection }) {
  const [height, setHeight] = useState("400px");
  const [overlay, setOverlay] = useState(false);
  const [parts, setParts] = useState([]);

  const addPart = () => {
    if (parts.length < 2) {
      // Limit to 2 parts
      setParts((prevParts) => [
        ...prevParts,
        {
          type: "text",
          text: "",
          align: "left",
          color: "black",
          scrollEffectType: "",
          width: "50%",
          movingRange: "",
          zoomingRange: "",
        },
      ]);
    } else {
      alert("You can only add up to 2 parts.");
    }
  };

  const deletePart = (index) => {
    setParts((prevParts) => prevParts.filter((_, i) => i !== index));
  };

  const handlePartChange = (index, field, value) => {
    setParts((prevParts) => {
      const newParts = [...prevParts];
      newParts[index] = { ...newParts[index], [field]: value };
      return newParts;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSection = {
      height,
      overlay,
      parts: parts.map((part) => {
        const startEffect = part.scrollEffectType ? 200 : undefined;
        const rangeEffect = part.scrollEffectType
          ? parseInt(height)
          : undefined;

        return {
          ...part,
          startEffect,
          rangeEffect,
        };
      }),
    };

    addSection(height, overlay, newSection);
    clearForm();
  };

  const clearForm = () => {
    setHeight("400px");
    setOverlay(false);
    setParts([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Height:</label>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2"
          placeholder="e.g., 400px"
        />
      </div>
      <div>
        <label className="block">Overlay:</label>
        <select
          value={overlay}
          onChange={(e) => setOverlay(e.target.value === "true")}
          className="border p-2"
        >
          <option value={false}>False</option>
          <option value={true}>True</option>
        </select>
      </div>
      <div>
        <button
          type="button"
          onClick={addPart}
          className="bg-blue-500 text-white p-2"
        >
          Add Part
        </button>
      </div>
      {parts.map((part, index) => (
        <div key={index} className="border p-4 space-y-2">
          <div>
            <label className="block">Part Type:</label>
            <select
              value={part.type}
              onChange={(e) => handlePartChange(index, "type", e.target.value)}
              className="border p-2"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
          </div>
          {part.type === "image" && (
            <>
              <div>
                <label className="block">Image URL:</label>
                <input
                  type="text"
                  value={part.imageUrl || ""}
                  onChange={(e) =>
                    handlePartChange(index, "imageUrl", e.target.value)
                  }
                  className="border p-2"
                />
              </div>
              <div>
                <label className="block">Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handlePartChange(index, "imageUrl", reader.result);
                    };
                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="border p-2"
                />
              </div>
            </>
          )}
          {part.type === "text" && (
            <>
              <div>
                <label className="block">Text:</label>
                <textarea
                  value={part.text}
                  onChange={(e) =>
                    handlePartChange(index, "text", e.target.value)
                  }
                  className="border p-2"
                />
              </div>
              <div>
                <label className="block">Align:</label>
                <select
                  value={part.align}
                  onChange={(e) =>
                    handlePartChange(index, "align", e.target.value)
                  }
                  className="border p-2"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div>
                <label className="block">Color:</label>
                <input
                  type="color"
                  value={part.color}
                  onChange={(e) =>
                    handlePartChange(index, "color", e.target.value)
                  }
                  className="border p-2"
                />
              </div>
            </>
          )}
          <div>
            <label className="block">Scroll Effect Type:</label>
            <select
              value={part.scrollEffectType}
              onChange={(e) =>
                handlePartChange(index, "scrollEffectType", e.target.value)
              }
              className="border p-2"
            >
              <option value="">None</option>
              {scrollEffects.map((effect) => (
                <option key={effect} value={effect}>
                  {effect}
                </option>
              ))}
            </select>
          </div>
          {part.scrollEffectType === "slowly-move-up" && (
            <div>
              <label className="block">Moving Range:</label>
              <input
                type="text"
                value={part.movingRange}
                onChange={(e) =>
                  handlePartChange(index, "movingRange", e.target.value)
                }
                className="border p-2"
                placeholder="e.g., 40%"
              />
            </div>
          )}
          {part.scrollEffectType === "slowly-zooming" && (
            <div>
              <label className="block">Zooming Range:</label>
              <input
                type="text"
                value={part.zoomingRange}
                onChange={(e) =>
                  handlePartChange(index, "zoomingRange", e.target.value)
                }
                className="border p-2"
                placeholder="e.g., 20%"
              />
            </div>
          )}
          <div>
            <label className="block">Width:</label>
            <input
              type="text"
              value={part.width}
              onChange={(e) => handlePartChange(index, "width", e.target.value)}
              className="border p-2"
              placeholder="e.g., 50%"
            />
          </div>
          <button
            type="button"
            onClick={() => deletePart(index)}
            className="bg-red-500 text-white p-2"
          >
            Delete Part
          </button>
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add Section
      </button>
    </form>
  );
}

export default BioForm;
