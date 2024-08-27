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

    const handleSubmit = () => {
        // You would save the links or navigate to the Home component with these links
        // For now, let's navigate to the home page
        router.push({ pathname: '/', query: { links: JSON.stringify(links) } });
    };

    return (
        <main className="bg-slate-300">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="mb-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Add Embed Link Here!
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
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </main>
    );
}

export default AddVideo;
