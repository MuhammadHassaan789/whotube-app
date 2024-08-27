'use client'

import Navbar from "@/components/ui/navbar";
import Video from "@/components/Video";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [videoLinks, setVideoLinks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.links) {
      try {
        // Safely parse the links query parameter
        const parsedLinks = JSON.parse(router.query.links);
        if (Array.isArray(parsedLinks)) {
          setVideoLinks(parsedLinks);
        } else {
          console.error("Parsed links is not an array:", parsedLinks);
        }
      } catch (error) {
        console.error("Failed to parse links:", error);
      }
    }
  }, [router.query.links]);

  return (
    <main className="bg-slate-300">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row justify-center items-center h-screen flex-wrap">
        {videoLinks.map((link, index) => (
          <Video
            key={index}
            src={link}
            isPlaying={playingIndex === index}
            onPlay={() => setPlayingIndex(index)}
          />
        ))}
      </div>
    </main>
  );
}
