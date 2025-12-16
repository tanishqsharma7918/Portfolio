import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";

const BirdBackground = () => {
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                BIRDS({
                    el: vantaRef.current,
                    THREE: THREE,

                    // --- CONFIGURATION ---
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    
                    // Theme Colors (Matches Nikhila Koneru Palette)
                    backgroundColor: 0x0a192f, // Main Navy Background
                    color1: 0x64ffda,          // Teal (Bird Wings)
                    color2: 0x112240,          // Light Navy (Bird Body)
                    colorMode: "lerp",         // Smooth blending
                    
                    // Bird Physics
                    birdSize: 1.5,
                    wingSpan: 30.00,
                    speedLimit: 5.00,
                    separation: 20.00,
                    alignment: 20.00,
                    cohesion: 20.00,
                    quantity: 3.00             // Flock size
                })
            );
        }
        
        // Cleanup function to prevent memory leaks
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div 
            ref={vantaRef} 
            className="absolute inset-0 w-full h-full z-0"
        />
    );
};

export default BirdBackground;
