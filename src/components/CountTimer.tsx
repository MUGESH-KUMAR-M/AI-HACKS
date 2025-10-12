"use client";

import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountTimerProps {
    targetDate?: string;
    title?: string;
    className?: string;
}

const CountTimer: React.FC<CountTimerProps> = ({
    targetDate = "2025-09-20T18:00:00",
    className = ""
}) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const calculateTimeLeft = (): TimeLeft => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            } else {
                setIsActive(false);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate, mounted]);

    if (!mounted) {
        return (
            <div className={`flex justify-center items-center p-8 ${className}`}>
                <div className="animate-pulse bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 w-full max-w-2xl h-48 border border-cyan-400/10"></div>
            </div>
        );
    }

    if (!isActive) {
        return (
            <div className={`text-center p-8 ${className}`}>
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl border-2 border-green-400/30 backdrop-blur-sm p-8 max-w-2xl mx-auto shadow-2xl">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Rocket className="w-12 h-12 text-green-400 animate-bounce" />
                        <h2 className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Hackathon is Live!
                        </h2>
                        <Rocket className="w-12 h-12 text-green-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <p className="text-green-200 text-lg font-semibold">
                        The AI Hacks Hackathon has started!
                    </p>
                </div>
            </div>
        );
    }

    const timeUnits = [
        { label: 'Days', value: timeLeft.days, color: 'from-red-400 to-orange-400' },
        { label: 'Hours', value: timeLeft.hours, color: 'from-yellow-400 to-amber-400' },
        { label: 'Minutes', value: timeLeft.minutes, color: 'from-cyan-400 to-blue-400' },
        { label: 'Seconds', value: timeLeft.seconds, color: 'from-purple-400 to-pink-400' }
    ];

    return (
        <div className={`w-full max-w-2xl mx-auto ${className}`}>
            <div className="flex items-center justify-center gap-3 md:gap-4">
                {timeUnits.map((unit, index) => (
                    <React.Fragment key={unit.label}>
                        <div className="text-center relative group">
                            {/* Glow effect background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity`}></div>
                            
                            {/* Number display */}
                            <div className="relative">
                                <div
                                    className={`text-5xl md:text-7xl font-black leading-none mb-2 bg-gradient-to-br ${unit.color} bg-clip-text text-transparent`}
                                    style={{
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                        fontWeight: '900',
                                        filter: 'drop-shadow(0 0 20px currentColor)'
                                    }}
                                >
                                    {String(unit.value).padStart(2, '0')}
                                </div>
                                
                                {/* Label */}
                                <div className={`text-xs md:text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${unit.color} bg-clip-text text-transparent`}>
                                    {unit.label}
                                </div>
                            </div>
                        </div>

                        {index < timeUnits.length - 1 && (
                            <div
                                className="text-4xl md:text-6xl font-black self-start mt-2 bg-gradient-to-b from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse"
                                style={{
                                    fontWeight: '900'
                                }}
                            >
                                :
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CountTimer;