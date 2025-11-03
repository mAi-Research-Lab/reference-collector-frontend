'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Highlighter, FolderOpen, Tag, Sparkles } from 'lucide-react';

export default function ReferenceAnnotationAnimation() {
    const [stage, setStage] = useState<'idle' | 'highlight' | 'annotate' | 'tag'>('idle');

    useEffect(() => {
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, loop: NodeJS.Timeout;

        const startSequence = () => {
            setStage('idle');
            // 1️⃣ Highlight
            t1 = setTimeout(() => setStage('highlight'), 1500);
            // 2️⃣ Annotation
            t2 = setTimeout(() => setStage('annotate'), 4000);
            // 3️⃣ Tag
            t3 = setTimeout(() => setStage('tag'), 6500);
            // 4️⃣ Loop
            loop = setTimeout(() => startSequence(), 9500);
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
            className="relative w-[600px] h-[380px] bg-neutral-100 rounded-xl shadow-md overflow-hidden border border-neutral-200 backdrop-blur-sm"
        >
            {/* macOS Top Bar */}
            <div className="flex items-center gap-2 bg-neutral-200 h-8 px-4 border-b border-neutral-300">
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 text-center font-semibold text-neutral-800 text-sm">
                    Annotation
                </div>
            </div>

            {/* PDF Viewer Simülasyonu */}
            <div className="relative bg-white h-[calc(100%-32px)] p-6 text-neutral-700 text-[14px] leading-relaxed font-serif overflow-hidden">
                <p>
                    Artificial intelligence (AI) has become a cornerstone of modern research, offering
                    automation, predictive modeling, and data-driven insights across diverse fields.
                    However, the ethical implications and reproducibility of AI-generated results remain
                    major concerns.
                </p>

                {/* Highlighted Text */}
                {stage === 'highlight' && (
                    <motion.span
                        initial={{ backgroundColor: 'transparent' }}
                        animate={{ backgroundColor: '#fef08a' }}
                        transition={{ duration: 0.6 }}
                        className="absolute top-[72px] left-[130px] px-1 rounded-sm"
                    >
                        predictive modeling
                    </motion.span>
                )}

                {/* Annotation Sticky Note */}
                {stage === 'annotate' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-24 right-8 bg-yellow-100 border border-yellow-200 rounded-md shadow-sm p-3 w-48 text-xs text-yellow-800"
                    >
                        <Highlighter className="w-3 h-3 inline-block mr-1 text-yellow-700" />
                        AI enables predictive models but needs reproducibility validation.
                    </motion.div>
                )}

                {/* Tagging Popup */}
                {stage === 'tag' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-20 right-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm px-3 py-2 flex items-center gap-2 text-sm text-blue-700"
                    >
                        <Tag className="w-4 h-4 text-blue-600" />
                        <span>Tagged as “Machine Learning”</span>
                    </motion.div>
                )}

                {/* Floating Toolbar (bottom left) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute bottom-6 left-6 flex items-center gap-3 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-lg shadow-sm text-sm text-neutral-700"
                >
                    <Highlighter className="w-4 h-4 text-yellow-600" />
                    <FolderOpen className="w-4 h-4 text-blue-600" />
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-neutral-500 ml-2">Smart Annotation Tools</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
