'use client'

import Navbar from '@/components/ui/navbar.jsx';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddVideo() {
    const [links, setLinks] = useState(Array(7).fill(''));
    const router = useRouter();

    const handleChange = (index, value) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const handleSubmit = async () => {
        const validLinks = links.filter(link => link !== '');

        if (validLinks.length === 0) {
            alert("Please add at least one valid video link.");
            return;
        }

        // Save the new playlist to the backend
        await fetch('https://whotube-backend-production.up.railway.app/api/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ links: validLinks }),
        });

        // Navigate to the home page
        router.push('/');
    };

    return (
        <main className="bg-slate-300">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="mb-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Add New Playlist
                    </h2>
                </div>
                {links.map((link, index) => (
                    <div key={index} className="flex w-full max-w-sm items-center space-x-2 p-2">
                        <Input
                            type="link"
                            placeholder="Paste Link"
                            value={link}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div className="flex w-full max-w-sm justify-center space-x-2 p-2">
                    <Button onClick={handleSubmit}>Submit New Playlist</Button>
                </div>
            </div>
        </main>
    );
}

export default AddVideo;

