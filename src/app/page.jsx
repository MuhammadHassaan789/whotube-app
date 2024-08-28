'use client'

import Navbar from "@/components/ui/navbar";
import Video from "@/components/Video";
import { useState, useEffect } from "react";

export default function Home() {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [videoLinks, setVideoLinks] = useState([]);
  const [currentDescription, setCurrentDescription] = useState("No description available");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://whotube-backend-production.up.railway.app/api/videos');
        const data = await response.json();
        if (data.length > 0) {
          setVideoLinks(data[0].links);
          fetchDescription(data[0].links[0]); // Fetch description for the first video
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await fetch('https://whotube-backend-production.up.railway.app/api/notes');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchVideos();
    fetchNotes();
  }, []);

  const fetchDescription = async (url) => {
    try {
      const response = await fetch('https://whotube-backend-production.up.railway.app/api/video-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setCurrentDescription(data.description || 'No description available');
    } catch (error) {
      console.error("Error fetching video description:", error);
      setCurrentDescription('No description available');
    }
  };

  const handleVideoChange = (index) => {
    setPlayingIndex(index);
    fetchDescription(videoLinks[index]);
  };

  return (
    <main className="bg-slate-300">
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto py-8">
        {videoLinks.length > 0 ? (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 mb-4">
              <Video
                src={videoLinks[playingIndex]}
                isPlaying={true}
                onTimestamp={(timestamp) => console.log('Timestamp:', timestamp)}
              />
              <p className="mt-4 text-gray-700">{currentDescription}</p>
              <div>
                <h3 className="text-xl font-bold">Notes:</h3>
                <ul>
                  {notes.filter(note => note.videoUrl === videoLinks[playingIndex]).map((note, index) => (
                    <li key={index}>
                      {note.timestamp}: {note.note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <div className="flex flex-col space-y-4">
                {videoLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${playingIndex === index ? 'opacity-50' : ''}`}
                    onClick={() => handleVideoChange(index)}
                  >
                    <Video
                      src={link}
                      isPlaying={playingIndex === index}
                      onPlay={() => handleVideoChange(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-center">No video links</h1>
          </div>
        )}
      </div>
    </main>
  );
}
