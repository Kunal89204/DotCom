import React, { useState, useEffect } from 'react';

interface IdType {
    videoId: string | number | any; // videoId should now be the YouTube video ID
}

const Player: React.FC<IdType> = ({ videoId }) => {
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
        <div className="relative w-full h-0" style={{ paddingTop: '56.25%' }}> {/* Aspect ratio 16:9 */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="loader">Loading...</div> {/* Replace with a spinner or animated loader */}
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-600 text-white">
                    {error}
                </div>
            )}
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
                title={`YouTube Trailer Player for ${videoId}`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleError}
            />
        </div>
    );
};

export default Player;
