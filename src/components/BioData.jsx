const BioData = ({ Bio, onDelete }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="h-[80vh] overflow-y-auto border border-gray-300 rounded-lg p-4">
        {Object.entries(Bio).map(([sectionKey, section]) => (
          <div
            key={sectionKey}
            className="w-full mb-8 border p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{sectionKey}</h2>
              <h2>Overlay: {section.overlay ? "True" : "False"}</h2>
              <button
                onClick={() => onDelete(sectionKey)}
                className="text-white rounded-lg bg-red-500 py-2 px-4"
              >
                Delete
              </button>
            </div>
            <div className="flex flex-row gap-4">
              {Object.entries(section.parts).map(([partKey, part]) => (
                <div key={partKey} className="flex-1 p-2">
                  <p className="text-sm font-semibold mb-2">{partKey}</p>
                  {part.type === "image" ? (
                    <img
                      src={part.imageUrl}
                      alt={`Part ${partKey}`}
                      className="w-full h-auto rounded-md"
                    />
                  ) : (
                    <>
                      <p className="text-lg">Text: {part.text}</p>
                      <p>
                        <strong>Color:</strong> {part.color}
                      </p>
                      <p>
                        <strong>Align:</strong> {part.align}
                      </p>
                    </>
                  )}
                  <div className="text-gray-500 text-sm mt-2">
                    <p>
                      <strong>Type:</strong> {part.type}
                    </p>
                    <p>
                      <strong>Width:</strong> {part.width}
                    </p>
                    {part.scrollEffectType && (
                      <p>
                        <strong>Effect:</strong> {part.scrollEffectType}
                      </p>
                    )}
                    {part.startEffect && (
                      <p>
                        <strong>Start:</strong> {part.startEffect}
                      </p>
                    )}
                    {part.rangeEffect && (
                      <p>
                        <strong>Range:</strong> {part.rangeEffect}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BioData;
