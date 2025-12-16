import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Grid lines configuration
        const gridSpacing = 50;
        let offset = 0;

        // Check if dark mode
        const isDarkMode = () => {
            return document.documentElement.classList.contains('dark');
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const darkMode = isDarkMode();
            const lineColor = darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
            
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;

            // Slowly move the grid
            offset += 0.3;
            if (offset >= gridSpacing) offset = 0;

            // Draw vertical lines
            for (let x = -offset; x < canvas.width + gridSpacing; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Draw horizontal lines
            for (let y = -offset; y < canvas.height + gridSpacing; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -10 }}
        />
    );
};

export default GridBackground;
