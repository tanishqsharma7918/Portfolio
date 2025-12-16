'use client';
import React, { useRef, useState } from 'react';

/**
 * SpotlightCard Component
 * 
 * A wrapper component that creates a mouse-following spotlight effect.
 * The spotlight is a radial gradient that follows the cursor position,
 * creating an elegant glow effect on hover.
 * 
 * Features:
 * - Tracks mouse position relative to the card
 * - Updates CSS variables for dynamic gradient positioning
 * - Smooth opacity transitions on enter/leave
 * - Accessible (handles focus states)
 */

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-navy/30 dark:border-white/10 bg-white/80 dark:bg-navy/40 px-8 py-10 shadow-2xl ${className}`}
        >
            {/* The Spotlight Overlay */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(100, 255, 218, 0.15), transparent 40%)`,
                }}
            />

            {/* The Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default SpotlightCard;
