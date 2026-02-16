import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AtmosphereProps {
    weather: any;
}

const Atmosphere: React.FC<AtmosphereProps> = ({ weather }) => {
    if (!weather) return null;

    const condition = weather.details; // e.g., "Clear", "Clouds", "Rain", "Snow", "Thunderstorm"
    const isNight = weather.icon?.includes('n');

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <AnimatePresence mode="wait">
                {/* Sun Effect */}
                {condition === 'Clear' && !isNight && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-yellow-300/30 blur-[100px]"
                    />
                )}

                {/* Rain Effect */}
                {(condition === 'Rain' || condition === 'Drizzle') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -20, x: Math.random() * 100 + 'vw', opacity: 0 }}
                                animate={{
                                    y: '110vh',
                                    opacity: [0, 0.5, 0],
                                }}
                                transition={{
                                    duration: Math.random() * 0.5 + 0.5,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "linear"
                                }}
                                className="absolute w-[1px] h-[20px] bg-blue-200"
                            />
                        ))}
                    </motion.div>
                )}

                {/* Clouds Effect */}
                {condition === 'Clouds' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: '-20vw', y: 10 + i * 15 + 'vh' }}
                                animate={{ x: '120vw' }}
                                transition={{
                                    duration: 30 + Math.random() * 30,
                                    repeat: Infinity,
                                    delay: Math.random() * 20,
                                    ease: "linear"
                                }}
                                className="absolute w-[300px] h-[150px] bg-white/20 blur-[50px] rounded-full"
                            />
                        ))}
                    </motion.div>
                )}

                {/* Snow Effect */}
                {condition === 'Snow' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    y: -20,
                                    x: Math.random() * 100 + 'vw',
                                    opacity: 0,
                                    scale: Math.random() * 0.5 + 0.5
                                }}
                                animate={{
                                    y: '110vh',
                                    x: [null, (Math.random() * 20 - 10) + 'vw'], // Add a bit of horizontal sway
                                    opacity: [0, 0.8, 0],
                                }}
                                transition={{
                                    duration: Math.random() * 3 + 3, // Slower than rain
                                    repeat: Infinity,
                                    delay: Math.random() * 5,
                                    ease: "linear"
                                }}
                                className="absolute w-[6px] h-[6px] bg-white rounded-full blur-[1px]"
                            />
                        ))}
                    </motion.div>
                )}

                {/* Lightning for Thunderstorm */}
                {condition === 'Thunderstorm' && (
                    <motion.div
                        animate={{
                            opacity: [0, 1, 0, 1, 0],
                        }}
                        transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 5 + 2
                        }}
                        className="absolute inset-0 bg-white/10"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Atmosphere;
