'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HexagonBackground } from '@/components/ui/shadcn-io/hexagon-background';
import TypingText from '@/components/ui/shadcn-io/typing-text';
import { FlipWords } from '@/components/ui/shadcn-io/flip-words';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen max-h-screen overflow-hidden flex items-center justify-center">
      <HexagonBackground className="absolute inset-0 flex items-center justify-center rounded-xl" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-0">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-4 max-w-full"
        >
          {/* Typing text effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <TypingText
              text={['Hi! I am Tahsin Ahmed Refat.']}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              className="text-2xl md:text-4xl font-bold"
              cursorClassName="h-6 md:h-10"
            />
          </motion.div>
          {/* Bigger text below */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="max-w-full"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="inline">I am </span>
              <span className="inline">
                <FlipWords
                  words={['A Full Stack Software Developer', 'An ML Enthusiast', 'An AI Enthusiast']}
                  duration={2500}
                />
              </span>
            </h2>
          </motion.div>
        </motion.div>
        
        {/* Right side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex items-center justify-center md:justify-end max-w-full"
        >
          <Image
            src="/Group 11 1.png"
            alt="Tahsin"
            width={800}
            height={800}
            className="w-full h-auto max-w-sm md:max-w-xl lg:max-w-2xl"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}

