import React, { useState, useEffect } from 'react';



interface PlayerProps {
  videoId: string|number|any; // Expecting a valid YouTube video ID
}

const Player: React.FC<PlayerProps> = ({ videoId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    // Reset loading and error states when videoId changes
    setLoading(true);
    setError(null);
  }, [videoId]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError('Failed to load video. Please try again later.');
  };

  return (
    <div className="relative w-full h-0 bg-black" style={{ paddingTop: '56.25%' }}> {/* Aspect ratio 16:9 */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="loader">Loading...</div> {/* Add custom loader component or CSS spinner */}
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-600 text-white">
          <p>{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
            }}
            className="mt-4 px-4 py-2 bg-white text-red-600 rounded"
          >
            Retry
          </button>
        </div>
      )}
      {!error && (
         <iframe
          title="Video Player"
          src={videoId ? videoUrl : ''}
          className="rounded-xl"
          style={{
            position: 'absolute',
            top: "6%",
            left: '10%',
            right: '10%',
            bottom: 10,
            width: '80%',
            height: '70%',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.4)', // Adjusted for cleaner shadows
          }}
          frameBorder="0"
          referrerPolicy="origin"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleError}
        ></iframe>
      )}
    </div>
  );
};

export default Player;
