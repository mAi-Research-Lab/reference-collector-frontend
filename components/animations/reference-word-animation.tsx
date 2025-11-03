'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ListOrdered, Settings, CheckCircle } from 'lucide-react';

export default function ReferenceWordRibbonAnimation() {
    const [stage, setStage] = useState<'idle' | 'citation' | 'bibliography' | 'preferences'>('idle');

    useEffect(() => {
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, loop: NodeJS.Timeout;

        const startSequence = () => {
            setStage('idle');

            // 1️⃣ Citation
            t1 = setTimeout(() => setStage('citation'), 1500);
            // 2️⃣ Bibliography
            t2 = setTimeout(() => setStage('bibliography'), 4000);
            // 3️⃣ Preferences
            t3 = setTimeout(() => setStage('preferences'), 6000);
            // 4️⃣ Döngü
            loop = setTimeout(() => startSequence(), 9000);
        };

        startSequence();
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(loop);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-[600px] h-[380px] bg-neutral-100 rounded-xl shadow-md overflow-hidden border border-neutral-200 mx-auto backdrop-blur-sm"
        >
            {/* macOS Top Bar */}
            <div className="flex items-center gap-2 bg-neutral-200 h-8 px-4 border-b border-neutral-300">
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 text-center font-semibold text-neutral-800 text-sm">
                    Citext
                </div>
            </div>

            {/* Toolbar Ribbon */}
            <div className="bg-white border-b border-neutral-300 h-10 flex items-center px-4 gap-3 shadow-sm">
                <motion.button
                    animate={{ backgroundColor: stage === 'citation' ? '#dbeafe' : '#f9fafb' }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-md border border-neutral-300 text-sm hover:bg-neutral-100"
                >
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Add Citation
                </motion.button>

                <motion.button
                    animate={{ backgroundColor: stage === 'bibliography' ? '#dcfce7' : '#f9fafb' }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-md border border-neutral-300 text-sm hover:bg-neutral-100"
                >
                    <ListOrdered className="w-4 h-4 text-green-600" />
                    Add Bibliography
                </motion.button>

                <motion.button
                    animate={{ backgroundColor: stage === 'preferences' ? '#fef9c3' : '#f9fafb' }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-md border border-neutral-300 text-sm hover:bg-neutral-100"
                >
                    <Settings className="w-4 h-4 text-yellow-600" />
                    Preferences
                </motion.button>
            </div>

            {/* Word Document Area */}
            <div className="relative bg-white h-[calc(100%-72px)] p-8 font-serif text-neutral-800">
                {/* Typing Text */}
                <motion.p
                    key={stage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-[15px] leading-relaxed"
                >
                    Artificial Intelligence has significantly influenced ethical decision-making
                    processes in modern research and technology applications
                    {stage === 'citation' && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-blue-600 font-serif ml-1"
                        >
                            [Doe, 2024]
                        </motion.span>
                    )}
                    .
                </motion.p>

                {/* Bibliography Section */}
                {stage === 'bibliography' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute bottom-6 left-8 right-8 bg-neutral-50 border-t border-neutral-200 pt-3"
                    >
                        <h4 className="font-semibold text-sm mb-2 text-neutral-700">References</h4>
                        <p className="text-xs text-neutral-600">
                            Doe, J. (2024). Artificial Intelligence and Ethics. Citext Journal.
                        </p>
                        <p className="text-xs text-neutral-600">
                            Smith, A. (2023). AI Decision Frameworks. Research AI Press.
                        </p>
                    </motion.div>
                )}

                {/* Preferences Popup */}
                {stage === 'preferences' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-8 right-8 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm px-3 py-2 flex items-center gap-2 text-sm text-yellow-700"
                    >
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span>Style changed to APA</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
