'use client'

import React, { useEffect, useRef } from 'react';

const Video = ({ src, isPlaying, onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <iframe
      ref={videoRef}
      width="560"
      height="315"
      src={src}
      title="Video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ width: '45%', height: '52%', cursor: 'pointer' }}
      onClick={onPlay} // Trigger onPlay when this video is clicked
    ></iframe>
  );
};

export default Video;
