'use client';
import React, { useRef, useState } from 'react';

/**
 * LevitatingCard Component
 * 
 * A custom 3D parallax tilt effect that makes cards feel like they're floating
 * and responding to mouse movement with physical rotation.
 * 
 * Built from scratch - no external dependencies needed!
 * 
 * Features:
 * - 3D perspective rotation (max 15°)
 * - Subtle scale on hover (1.02x zoom)
 * - Smooth transitions
 * - Resets on mouse leave
 * - Custom easing curve
 * - Performance optimized
 * 
 * Physics Settings:
 * - max: 15° rotation (subtle, professional)
 * - perspective: 1000px (moderate 3D depth)
 * - scale: 1.02 (2% lift effect)
 * - transition: 400ms (smooth, responsive)
 */

const LevitatingCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState('');

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation angles (max 5 degrees - reduced for subtlety)
        const rotateX = ((y - centerY) / centerY) * -5; // Inverted for natural tilt
        const rotateY = ((x - centerX) / centerX) * 5;
        
        // Apply 3D transform with minimal scale
        setTransform(
            `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
        );
    };

    const handleMouseEnter = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
        setTransform('perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: transform,
                transformStyle: 'preserve-3d',
            }}
            className={`h-full ${className}`}
        >
            {children}
        </div>
    );
};

export default LevitatingCard;
