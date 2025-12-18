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

        // Create silver star particle system with twinkling
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 4000 : 8000; // Reduced on mobile
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
        const sizeArray = new Float32Array(particlesCount);
        const twinklePhaseArray = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            
            // Position - wider spread for cosmic effect
            posArray[i3] = (Math.random() - 0.5) * 150;
            posArray[i3 + 1] = (Math.random() - 0.5) * 150;
            posArray[i3 + 2] = (Math.random() - 0.5) * 150;

            // Silver star color (slightly varied for depth)
            const brightness = 0.8 + Math.random() * 0.2; // 0.8 to 1.0
            colorArray[i3] = brightness;     // R
            colorArray[i3 + 1] = brightness; // G
            colorArray[i3 + 2] = brightness; // B

            // Random size for star variation
            sizeArray[i] = Math.random() * 2 + 0.5; // 0.5 to 2.5

            // Random twinkle phase for each star
            twinklePhaseArray[i] = Math.random() * Math.PI * 2;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
        particlesGeometry.setAttribute('twinklePhase', new THREE.BufferAttribute(twinklePhaseArray, 1));

        // Custom shader material for twinkling effect
        const particlesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute float twinklePhase;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vOpacity;
                uniform float time;

                void main() {
                    vColor = color;
                    
                    // Twinkling effect with individual phases
                    float twinkle = sin(time * 2.0 + twinklePhase) * 0.5 + 0.5;
                    vOpacity = 0.3 + twinkle * 0.7; // Opacity varies from 0.3 to 1.0
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vOpacity;

                void main() {
                    // Create round particles
                    float r = length(gl_PointCoord - vec2(0.5, 0.5));
                    if (r > 0.5) discard;
                    
                    // Soft edge with glow
                    float alpha = smoothstep(0.5, 0.2, r) * vOpacity;
                    
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        particlesMeshRef.current = particlesMesh;

        // Add additional smaller starfield layer for depth
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = window.innerWidth < 768 ? 500 : 1000;
        const starsArray = new Float32Array(starsCount * 3);
        const starsSizeArray = new Float32Array(starsCount);
        const starsTwinkleArray = new Float32Array(starsCount);

        for (let i = 0; i < starsCount; i++) {
            const i3 = i * 3;
            starsArray[i3] = (Math.random() - 0.5) * 200;
            starsArray[i3 + 1] = (Math.random() - 0.5) * 200;
            starsArray[i3 + 2] = (Math.random() - 0.5) * 200;
            
            starsSizeArray[i] = Math.random() * 1 + 0.3; // 0.3 to 1.3
            starsTwinkleArray[i] = Math.random() * Math.PI * 2;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsArray, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizeArray, 1));
        starsGeometry.setAttribute('twinklePhase', new THREE.BufferAttribute(starsTwinkleArray, 1));

        const starsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute float twinklePhase;
                varying float vOpacity;
                uniform float time;

                void main() {
                    // Slower twinkle for background stars
                    float twinkle = sin(time * 1.5 + twinklePhase) * 0.5 + 0.5;
                    vOpacity = 0.2 + twinkle * 0.6;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying float vOpacity;

                void main() {
                    float r = length(gl_PointCoord - vec2(0.5, 0.5));
                    if (r > 0.5) discard;
                    
                    float alpha = smoothstep(0.5, 0.1, r) * vOpacity;
                    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starsMesh);

        // Animation loop
        let time = 0;
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            time += 0.01;

            // Update twinkle effect
            if (particlesMeshRef.current && particlesMeshRef.current.material.uniforms) {
                particlesMeshRef.current.material.uniforms.time.value = time;
            }

            if (starsMesh && starsMesh.material.uniforms) {
                starsMesh.material.uniforms.time.value = time;
            }

            // Slow rotation for cosmic drift effect
            if (particlesMeshRef.current) {
                particlesMeshRef.current.rotation.y += 0.0005;
                particlesMeshRef.current.rotation.x += 0.0002;
            }

            // Slower counter-rotation for background stars
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
