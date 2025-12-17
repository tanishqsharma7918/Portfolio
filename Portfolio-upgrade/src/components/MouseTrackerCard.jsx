'use client';
import React from 'react';

/**
 * MouseTrackerCard Component (Simplified)
 * 
 * A basic card component without mouse tracking effects.
 * Provides clean, simple card styling for content.
 * 
 * Features:
 * - Clean border and background
 * - Responsive padding
 * - Dark/Light mode support
 * - No mouse tracking (removed for cleaner design)
 */

const MouseTrackerCard = ({ children, className = "" }) => {
    return (
        <div
            className={`relative overflow-hidden rounded-xl border border-navy/20 dark:border-white/10 bg-white/80 dark:bg-navy/90 p-8 shadow-md ${className}`}
        >
            {/* Content */}
            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
};

export default MouseTrackerCard;
