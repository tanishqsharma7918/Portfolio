import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CosmicBackground = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const particlesMeshRef = useRef(null);
    const cameraRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 50;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create nebula particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 4000 : 8000; // Reduced on mobile
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Position - wider spread for nebula effect
            posArray[i] = (Math.random() - 0.5) * 150;
            posArray[i + 1] = (Math.random() - 0.5) * 150;
            posArray[i + 2] = (Math.random() - 0.5) * 150;

            // Color (purple, pink, cyan, indigo mix)
            const colorChoice = Math.random();
            if (colorChoice < 0.25) {
                // Purple (#8a2be2)
                colorArray[i] = 0.54;
                colorArray[i + 1] = 0.17;
                colorArray[i + 2] = 0.89;
            } else if (colorChoice < 0.5) {
                // Pink (#ff69b4)
                colorArray[i] = 1.0;
                colorArray[i + 1] = 0.41;
                colorArray[i + 2] = 0.71;
            } else if (colorChoice < 0.75) {
                // Cyan (#5eead4)
                colorArray[i] = 0.37;
                colorArray[i + 1] = 0.92;
                colorArray[i + 2] = 0.83;
            } else {
                // Indigo (#4b0082)
                colorArray[i] = 0.29;
                colorArray[i + 1] = 0.0;
                colorArray[i + 2] = 0.51;
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        // Particle material with additive blending for glow effect
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        particlesMeshRef.current = particlesMesh;

        // Add additional starfield layer
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = window.innerWidth < 768 ? 500 : 1000;
        const starsArray = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i += 3) {
            starsArray[i] = (Math.random() - 0.5) * 200;
            starsArray[i + 1] = (Math.random() - 0.5) * 200;
            starsArray[i + 2] = (Math.random() - 0.5) * 200;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsArray, 3));

        const starsMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starsMesh);

        // Animation loop
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            // Slow rotation for cosmic drift effect
            if (particlesMeshRef.current) {
                particlesMeshRef.current.rotation.y += 0.0005;
                particlesMeshRef.current.rotation.x += 0.0002;
            }

            // Slower counter-rotation for stars
            if (starsMesh) {
                starsMesh.rotation.y -= 0.0003;
                starsMesh.rotation.x -= 0.0001;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            // Dispose Three.js resources
            if (particlesGeometry) particlesGeometry.dispose();
            if (particlesMaterial) particlesMaterial.dispose();
            if (starsGeometry) starsGeometry.dispose();
            if (starsMaterial) starsMaterial.dispose();
            if (rendererRef.current) rendererRef.current.dispose();
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Base dark gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0520] via-[#1a0a3e] to-[#2d1b4e]" />

            {/* Three.js container */}
            <div 
                ref={containerRef} 
                className="absolute inset-0 w-full h-full"
                style={{ mixBlendMode: 'screen' }}
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Subtle vignette effect */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)'
                }}
            />
        </div>
    );
};

export default CosmicBackground;
