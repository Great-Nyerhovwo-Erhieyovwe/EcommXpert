import GLOBE from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import './VantaBg.css';

export default function VantaBg() {
    // NEW: Ref for Vanta container
    const vantaRef = useRef(null);
    const vantaInstance = useRef<any>(null);


    // NEW: Initialize Vanta Globe
    useEffect(() => {
        if (!vantaInstance.current && vantaRef.current) {
            vantaInstance.current = GLOBE({
                el: vantaRef.current,
                THREE: THREE,
                // Globe-specific options
                color: 0x4a90e2,           // Main color
                color2: 0x7b68ee,          // Secondary color
                size: 1.5,                 // Size of the globe particles
                backgroundColor: 0x0a0a0a, // Dark background
                points: 15.0,              // Number of points
                maxDistance: 20.0,         // Max distance for connections
                spacing: 15.0,             // Spacing between points
                // Performance options
                scale: 1.0,
                scaleMobile: 1.0,
            });
        }

        return () => {
            if (vantaInstance.current) {
                vantaInstance.current.destroy();
                vantaInstance.current = null;
            }
        };
    }, []);

    return (
        <div ref={vantaRef} className="vanta-bg" />
    );
}


