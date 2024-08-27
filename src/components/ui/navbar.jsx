'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const pathname = usePathname();
    
    const isAddVideoActive = pathname === "/add";
    const isWatchVideoActive = pathname === "/";

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-slate-200 dark:bg-gray-800">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">WhoTube</span>
            </Link>
            <div className="hidden md:flex gap-4">
                <Link
                    href="/add"
                    className={`text-lg font-medium hover:underline underline-offset-4 ${isAddVideoActive ? "underline" : ""}`}
                    prefetch={false}
                >
                    Make Playlist
                </Link>
                <Link
                    href="/"
                    className={`text-lg font-medium hover:underline underline-offset-4 ${isWatchVideoActive ? "underline" : ""}`}
                    prefetch={false}
                >
                    Watch Video
                </Link>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid w-[200px] p-4">
                        <Link
                            href="/add"
                            className={`text-lg font-medium hover:underline underline-offset-4 ${isAddVideoActive ? "underline" : ""}`}
                            prefetch={false}
                        >
                            Make Playlist
                        </Link>
                        <Link
                            href="/"
                            className={`text-lg font-medium hover:underline underline-offset-4 ${isWatchVideoActive ? "underline" : ""}`}
                            prefetch={false}
                        >
                            Watch Video
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 65 65"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <g>
                <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
            </g>
        </svg>
    )
}
