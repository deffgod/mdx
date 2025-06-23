"use client";

import React from 'react';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";



type AnimateTextProps = {
  words?: string[];
  interval?: number;
  className?: string;
}

const AnimateText: React.FC<AnimateTextProps> = ({ 
  words = ["COPY", "PASTE", "ANIMATE"],
  interval = 1000,
  className = ""
}) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [interval, words.length]);

  return (
    <div className={`bg-background size-full rounded-xl flex items-center justify-center flex-col ${className}`}>
      <div className="flex items-center justify-center flex-col max-w-md gap-4">
        <h1 className="text-4xl font-bold flex items-center">
          {words.map((word, idx) => (
            <span
              key={idx}
              className="flex items-center relative px-2 py-1 z-0"
            >
              {word}
              {idx === index && (
                <motion.span
                  layoutId="active-word-indicator"
                  className="absolute inset-0 -z-10 border border-neutral-500/20"
                >
                  <motion.span
                    layoutId="active-indicator-top-left"
                    className="absolute -top-1 -left-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-top-right"
                    className="absolute -top-1 -right-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-bottom-left"
                    className="absolute -bottom-1 -left-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-bottom-right"
                    className="absolute -bottom-1 -right-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                </motion.span>
              )}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default AnimateText;