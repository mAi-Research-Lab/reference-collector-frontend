'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, Settings, FileText } from 'lucide-react';

export default function ReferenceOrganizationAnimation() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-[600px] h-[380px] bg-neutral-100 rounded-xl shadow-md overflow-hidden border border-neutral-200 backdrop-blur-sm mx-auto"
        >
            {/* Header */}
            <div className="flex items-center gap-2 bg-neutral-200 h-8 px-3">
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="ml-4 flex-1 bg-white rounded-full h-4" />
            </div>

            {/* Content Area */}
            <div className="flex h-[calc(100%-32px)]">
                {/* Left Sidebar */}
                <div className="w-[120px] bg-white/70 border-r border-neutral-200 backdrop-blur-sm flex flex-col">
                    {/* Klasörler */}
                    <div className="p-4 space-y-3">
                        {[FileText, Folder, Settings].map((Icon, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8, filter: 'blur(6px)' }}
                                animate={{
                                    opacity: show ? 1 : 0,
                                    x: show ? 0 : -8,
                                    filter: show ? 'blur(0px)' : 'blur(6px)',
                                }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex items-center gap-2 text-blue-600 text-sm"
                            >
                                <Icon className="w-4 h-4" />
                                <div className="h-3 w-8 bg-blue-600/70 rounded" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-auto border-t border-neutral-200 p-3">
                        <p className="text-xs text-neutral-500 mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                            {['#4ade80', '#f87171', '#60a5fa', '#facc15', '#a78bfa', '#22d3ee'].map((color, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="h-2 w-10 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="flex-1 bg-white/70 border-r border-neutral-200 p-3 backdrop-blur-sm">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 5, filter: 'blur(6px)' }}
                            animate={{
                                opacity: show ? 1 : 0,
                                y: show ? 0 : 5,
                                filter: show ? 'blur(0px)' : 'blur(6px)',
                            }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="h-3 bg-neutral-200 rounded mb-2 w-[90%]"
                        />
                    ))}
                </div>

                {/* Right Column */}
                <div className="w-[160px] bg-neutral-50/70 p-3 backdrop-blur-sm">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 5, filter: 'blur(6px)' }}
                            animate={{
                                opacity: show ? 1 : 0,
                                x: show ? 0 : 5,
                                filter: show ? 'blur(0px)' : 'blur(6px)',
                            }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                            className="h-2 bg-neutral-200 rounded mb-2 w-[85%]"
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
