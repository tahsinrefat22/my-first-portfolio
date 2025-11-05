'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-background overflow-hidden py-16 md:py-24"
      style={{ willChange: 'opacity' }}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-center md:justify-start"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative w-full max-w-md">
              <Image
                src="/About Me.png"
                alt="About Me"
                width={600}
                height={600}
                className="w-full h-auto rounded-lg object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col gap-4"
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              About Me
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-base md:text-lg leading-relaxed">
                Welcome to my portfolio! I'm a passionate Full Stack Software Developer
                with a deep interest in Machine Learning and Artificial Intelligence.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                I enjoy building scalable web applications and exploring the latest
                technologies in AI and ML. My goal is to create innovative solutions
                that make a positive impact.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                When I'm not coding, you can find me experimenting with new frameworks, 
                open-source projects, or learning about the latest
                developments in the tech industry.
              </p>
            </div>
            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="flex justify-end mt-6 md:mt-8"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 group flex items-center gap-2"
                  >
                    My Career
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-1" align="end">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/career?company=spacesoft"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none cursor-pointer text-left"
                    >
                      SpaceSoft Ltd
                    </Link>
                    <Link
                      href="/career?company=fusion-infotech"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none cursor-pointer text-left"
                    >
                      Fusion Infotech Ltd
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

