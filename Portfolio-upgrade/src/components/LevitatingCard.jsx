'use client';
import React from 'react';
import { Tilt } from 'react-tilt';

/**
 * LevitatingCard Component
 * 
 * A 3D parallax tilt effect that makes cards feel like they're floating
 * and responding to mouse movement with physical rotation.
 * 
 * Features:
 * - 3D perspective rotation (max 15°)
 * - Subtle scale on hover (1.02x zoom)
 * - Smooth transitions (1000ms)
 * - Resets on mouse leave
 * - Custom easing curve
 * 
 * Physics Settings:
 * - max: 15° rotation (subtle, professional)
 * - perspective: 1000 (moderate 3D depth)
 * - scale: 1.02 (2% lift effect)
 * - speed: 1000ms (smooth transitions)
 */

const LevitatingCard = ({ children, className = "" }) => {
    const defaultOptions = {
        reverse: false,        // reverse the tilt direction
        max: 15,              // max tilt rotation (degrees) - Lower is more subtle
        perspective: 1000,    // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.02,          // 2% Zoom on hover (feels like it lifts up)
        speed: 1000,          // Speed of the enter/exit transition
        transition: true,     // Set a transition on enter/exit.
        axis: null,           // What axis should be disabled. Can be X or Y.
        reset: true,          // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
    };

    return (
        <Tilt options={defaultOptions} className={`h-full ${className}`}>
            {/* We keep the glass style, but now it MOVES */}
            <div className="h-full">
                {children}
            </div>
        </Tilt>
    );
};

export default LevitatingCard;
