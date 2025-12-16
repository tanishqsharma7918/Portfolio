import React, { useState, useEffect, useRef } from 'react';

/**
 * VantaBackground.jsx
 * 
 * A React component that dynamically loads Vanta Birds effect
 * to prevent SSR crashes and ensure safe client-side rendering.
 * 
 * Features:
 * - Dynamic import of Vanta library (loaded ONLY in browser)
 * - Proper cleanup on unmount
 * - Theme-aware colors (Navy & Teal)
 * - Responsive and interactive
 */

const VantaBackground = () => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        // Only run in browser (prevents SSR issues)
        if (typeof window === 'undefined') return;

        // Dynamically import Vanta and THREE
        let vantaLibrary = null;
        let THREE = null;

        const loadVanta = async () => {
            try {
                // Import THREE.js first
                THREE = await import('three');
                
                // Import Vanta Birds
                vantaLibrary = await import('vanta/dist/vanta.birds.min');

                // Initialize Vanta effect if component is still mounted
                if (vantaRef.current && !vantaEffect) {
                    const effect = vantaLibrary.default({
                        el: vantaRef.current,
                        THREE: THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        
                        // THEME COLORS (Navy & Teal)
                        backgroundColor: 0x0a192f, // Main Navy Background
                        color1: 0x64ffda,          // Teal (Primary Bird Color)
                        color2: 0x112240,          // Light Navy (Secondary Bird Color)
                        colorMode: "lerp",         // Smooth color blending
                        
                        // BIRD PHYSICS (Optimized for Performance)
                        birdSize: 1.5,             // Bird size
                        wingSpan: 30.00,           // Wing animation intensity
                        speedLimit: 5.00,          // Max flight speed
                        separation: 20.00,         // Distance between birds
                        alignment: 20.00,          // Flocking alignment
                        cohesion: 20.00,           // Flocking cohesion
                        quantity: 3.00,            // Number of birds (3 for performance)
                        
                        // RESPONSIVE
                        backgroundAlpha: 1.0       // Full opacity background
                    });
                    
                    setVantaEffect(effect);
                }
            } catch (error) {
                console.error('❌ Vanta Birds failed to load:', error);
            }
        };

        loadVanta();

        // CLEANUP: Destroy Vanta effect on unmount
        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, [vantaEffect]);

    return (
        <div
            ref={vantaRef}
            className="absolute inset-0 h-full w-full z-0"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0
            }}
        />
    );
};

export default VantaBackground;
