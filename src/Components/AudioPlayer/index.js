import React, { useState, useEffect } from 'react';

function AudioPlayer({ fileUrl, token }) {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const fetchAudio = async () => {
      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    };
    fetchAudio();
  }, [fileUrl, token]);

  if (!audioUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding : '10px' }}>
      <audio controls>
        <source src={audioUrl} type="audio/flac" />
          Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;