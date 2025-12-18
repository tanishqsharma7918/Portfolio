import React, { useEffect, useRef } from 'react';

const CosmicBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        // Create star particles
        const initStars = () => {
            stars = [];
            const starCount = window.innerWidth < 768 ? 300 : 800; // Reduced for mobile
            
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw stars with twinkling effect
            stars.forEach(star => {
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
                ctx.fill();
                
                // Add glow for larger stars
                if (star.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * 0.2})`;
                    ctx.fill();
                }
            });
            
            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize and start animation
        resizeCanvas();
        animate();

        // Handle window resize
        window.addEventListener('resize', resizeCanvas);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Nebula Cloud Layers - CSS Gradients */}
            <div className="absolute inset-0 opacity-60">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0520] via-[#1a0a3e] to-[#2d1b4e]" />
                
                {/* Purple nebula cloud */}
                <div 
                    className="absolute inset-0 animate-nebula-drift-1"
                    style={{
                        background: 'radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.4) 0%, transparent 50%)',
                        animationDuration: '30s'
                    }}
                />
                
                {/* Pink nebula cloud */}
                <div 
                    className="absolute inset-0 animate-nebula-drift-2"
                    style={{
                        background: 'radial-gradient(ellipse at 70% 50%, rgba(255, 105, 180, 0.3) 0%, transparent 50%)',
                        animationDuration: '40s'
                    }}
                />
                
                {/* Indigo nebula cloud */}
                <div 
                    className="absolute inset-0 animate-nebula-drift-3"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 70%, rgba(75, 0, 130, 0.35) 0%, transparent 50%)',
                        animationDuration: '35s'
                    }}
                />
                
                {/* Cyan accent */}
                <div 
                    className="absolute inset-0 animate-nebula-drift-4"
                    style={{
                        background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 40%)',
                        animationDuration: '45s'
                    }}
                />
                
                {/* Deep purple accent */}
                <div 
                    className="absolute inset-0 animate-nebula-drift-5"
                    style={{
                        background: 'radial-gradient(circle at 30% 80%, rgba(147, 51, 234, 0.25) 0%, transparent 45%)',
                        animationDuration: '50s'
                    }}
                />
            </div>

            {/* Starfield Canvas Overlay */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ mixBlendMode: 'screen' }}
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Subtle vignette effect */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)'
                }}
            />
        </div>
    );
};

export default CosmicBackground;
