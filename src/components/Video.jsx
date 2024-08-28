'use client'

import React, { useEffect, useRef, useState } from 'react';

const getVideoEmbedUrl = (src) => {
  let embedUrl = src;
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    const videoId = src.split('v=')[1] || src.split('/').pop();
    embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`; // Enable JavaScript API
  } else if (src.includes('vimeo.com')) {
    const videoId = src.split('/').pop();
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  } else if (src.includes('dailymotion.com')) {
    const videoId = src.split('/').pop().split('_')[0];
    embedUrl = `https://www.dailymotion.com/embed/video/${videoId}`;
  }
  return embedUrl;
};

const Video = ({ src, isPlaying, onPlay, onTimestamp }) => {
  const videoRef = useRef(null);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.style.border = '5px solid red';
    } else if (videoRef.current) {
      videoRef.current.style.border = 'none';
    }
  }, [isPlaying]);

  const handleAddNote = () => {
    setShowNoteInput(true);
    if (videoRef.current) {
      // Request current time from YouTube or Vimeo API
      videoRef.current.contentWindow.postMessage({ event: 'getCurrentTime' }, '*');
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin.includes('youtube.com') || event.origin.includes('vimeo.com')) {
        if (event.data && typeof event.data === 'object' && event.data.currentTime !== undefined) {
          window.currentVideoTime = event.data.currentTime;
          onTimestamp(window.currentVideoTime);  // Pass timestamp to parent component
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onTimestamp]);


  const handleSaveNote = async () => {
    const currentTime = window.currentVideoTime || 0;
    const timestamp = new Date(currentTime * 1000).toISOString().substr(11, 8);

    try {
      await fetch('https://whotube-backend-production.up.railway.app/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: src, timestamp, note }),
      });
      setShowNoteInput(false);
      setNote('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };



  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin.includes('youtube.com') || event.origin.includes('vimeo.com')) {
        if (event.data && typeof event.data === 'object' && event.data.currentTime !== undefined) {
          window.currentVideoTime = event.data.currentTime;
          onTimestamp(window.currentVideoTime);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onTimestamp]);

  return (
    <div>
      <iframe
        ref={videoRef}
        width="100%"
        height="315"
        src={getVideoEmbedUrl(src)}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <button onClick={handleAddNote}>Add Note</button>
      {showNoteInput && (
        <div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter your note"
          />
          <button onClick={handleSaveNote}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Video;
