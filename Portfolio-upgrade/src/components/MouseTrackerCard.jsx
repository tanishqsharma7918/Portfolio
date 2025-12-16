'use client';
import React, { useState, useRef } from 'react';

/**
 * MouseTrackerCard Component
 * 
 * An advanced card component with dual mouse-tracking effects:
 * 1. Spotlight Effect - A radial gradient glow that follows the cursor
 * 2. Border Reveal Effect - A glowing border that tracks the mouse position
 * 
 * Features:
 * - Real-time mouse position tracking relative to card
 * - Smooth opacity transitions on enter/leave
 * - Dual-layer effect (spotlight + border)
 * - Performance optimized with useRef
 */

const MouseTrackerCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        // Calculate mouse position relative to the card
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-navy/20 dark:border-white/10 bg-white/80 dark:bg-navy/90 p-8 shadow-md ${className}`}
        >
            {/* THE MOUSE FOLLOWER (Spotlight) */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(100, 255, 218, 0.15), transparent 40%)`,
                }}
            />

            {/* THE BORDER REVEAL (Follows Mouse) */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(100, 255, 218, 0.4), transparent 40%)`,
                    maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1px", // Thin border
                }}
            />

            {/* Content sits on top */}
            <div className="relative z-20 h-full">
                {children}
            </div>
        </div>
    );
};

export default MouseTrackerCard;
