'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';

export default function ReferenceCaptureAnimation() {
    const [stage, setStage] = useState<'idle' | 'typing' | 'content' | 'saved'>('idle');

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;
        let timeout3: NodeJS.Timeout;
        let loopTimeout: NodeJS.Timeout;

        const startSequence = () => {
            setStage('idle');

            // 1️⃣ Typing başlasın
            timeout1 = setTimeout(() => setStage('typing'), 800);

            // 2️⃣ İçerik gelsin
            timeout2 = setTimeout(() => setStage('content'), 2500);

            // 3️⃣ Kaydet (Saved)
            timeout3 = setTimeout(() => setStage('saved'), 4500);

            // 4️⃣ Döngü için başa dön
            loopTimeout = setTimeout(() => startSequence(), 7000);
        };

        startSequence();

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
            clearTimeout(loopTimeout);
        };
    }, []);

    return (
        <div className="relative w-[600px] h-[380px] bg-neutral-100 rounded-xl shadow-md mx-auto overflow-hidden border border-neutral-200">
            {/* Browser Header */}
            <div className="flex items-center gap-2 bg-neutral-200 h-10 px-4">
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>

                <div className="mx-4 flex-1 bg-white rounded-full h-5 flex items-center overflow-hidden px-3 text-[13px] text-neutral-600 font-mono relative">
                    {/* URL Bar */}
                    <div className="flex-1 bg-white rounded-full h-5 flex items-center overflow-hidden text-[13px] text-neutral-600 font-mono relative">
                        {(stage === 'typing' || stage === 'idle') && (
                            <>
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                                    className="absolute left-0 h-full bg-gradient-to-r from-neutral-200 via-neutral-100 to-white z-0"
                                />
                                <motion.span
                                    initial={{ opacity: 0, x: -2 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    className="relative z-10 pl-2 text-neutral-700"
                                >
                                    AI in Academic Research
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="inline-block w-1 bg-neutral-700 ml-0.5"
                                    />
                                </motion.span>
                            </>
                        )}

                        {(stage === 'content' || stage === 'saved') && (
                            <motion.span
                                key="finalurl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                className="relative z-10 pl-2 text-neutral-500"
                            >
                                https://ai-academic.com
                            </motion.span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 bg-white h-full">
                {/* Reference Capture Icon */}
                <motion.div
                    animate={{
                        opacity:
                            stage === 'content' || stage === 'saved'
                                ? 1
                                : 0,
                        scale: stage === 'saved' ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-4 right-6 bg-blue-100 p-3 rounded-full shadow-md"
                >
                    <FileText className="text-blue-600 w-6 h-6" />
                </motion.div>

                {/* Typing state */}
                {stage === 'typing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex items-center justify-center text-neutral-500"
                    >
                        <p className="text-sm">Typing search query...</p>
                    </motion.div>
                )}

                {/* Content */}
                {stage === 'content' && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="p-8 text-left text-neutral-700"
                    >
                        <h3 className="text-lg font-semibold mb-2">AI in Academic Research</h3>
                        <p className="text-sm leading-relaxed">
                            Recent advances in artificial intelligence have transformed how we
                            approach literature analysis, citation management, and collaborative
                            research workflows...
                        </p>
                    </motion.div>
                )}

                {/* Saved Message */}
                {stage === 'saved' && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-20 right-6 bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
                    >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Saved to Citext</span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
