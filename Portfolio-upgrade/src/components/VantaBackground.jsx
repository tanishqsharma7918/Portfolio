import { useEffect, useRef, useState } from 'react';

/**
 * VantaBackground Component
 * 
 * Safe client-side loading of Vanta Birds effect using dynamic imports.
 * Prevents SSR issues in Vite/React by ensuring browser-only execution.
 */

const VantaBackground = () => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);
    const effectInitialized = useRef(false);

    useEffect(() => {
        // Prevent double initialization
        if (effectInitialized.current) return;
        
        // Browser-only execution
        if (typeof window === 'undefined' || !vantaRef.current) return;

        let mounted = true;

        const initVanta = async () => {
            try {
                console.log('🚀 Starting Vanta Birds initialization...');
                
                // Step 1: Import THREE.js
                const threeModule = await import('three');
                const THREE = threeModule.default || threeModule;
                console.log('✅ THREE.js loaded');

                // Step 2: Import Vanta Birds
                const vantaModule = await import('vanta/dist/vanta.birds.min.js');
                const VANTA = vantaModule.default || vantaModule;
                console.log('✅ Vanta Birds module loaded');

                // Step 3: Initialize effect only if component is still mounted
                if (!mounted || !vantaRef.current || effectInitialized.current) {
                    console.log('⚠️ Component unmounted or already initialized, skipping...');
                    return;
                }

                console.log('🎨 Initializing Vanta Birds effect...');
                const effect = VANTA({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    
                    // THEME: Navy & Teal
                    backgroundColor: 0x0a192f,
                    color1: 0x64ffda,
                    color2: 0x112240,
                    colorMode: "lerp",
                    
                    // BIRDS: Optimized for smooth performance
                    birdSize: 1.5,
                    wingSpan: 30.00,
                    speedLimit: 5.00,
                    separation: 20.00,
                    alignment: 20.00,
                    cohesion: 20.00,
                    quantity: 3.00,
                    
                    backgroundAlpha: 1.0
                });

                if (mounted) {
                    setVantaEffect(effect);
                    effectInitialized.current = true;
                    console.log('✅ Vanta Birds initialized successfully! 🐦');
                }
            } catch (error) {
                console.error('❌ Vanta initialization error:', error);
                console.error('Error type:', error.name);
                console.error('Error message:', error.message);
                console.error('Stack:', error.stack);
            }
        };

        // Small delay for DOM readiness
        const timer = setTimeout(initVanta, 150);

        // Cleanup function
        return () => {
            mounted = false;
            clearTimeout(timer);
            
            if (vantaEffect && typeof vantaEffect.destroy === 'function') {
                console.log('🧹 Cleaning up Vanta effect...');
                vantaEffect.destroy();
                effectInitialized.current = false;
            }
        };
    }, []); // Empty deps - run once on mount

    return (
        <div
            ref={vantaRef}
            className="absolute inset-0 w-full h-full"
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
