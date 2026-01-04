'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Briefcase, ChevronDown } from 'lucide-react';
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
                src="/Beige Simple Circle Shaped LinkedIn Profile Picture (2).png"
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
                Welcome to my portfolio! I&apos;m a passionate Full Stack Software Developer
                with a deep interest in Machine Learning and Artificial Intelligence.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                I enjoy building scalable web applications and exploring the latest
                technologies in AI and ML. My goal is to create innovative solutions
                that make a positive impact.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                When I&apos;m not coding, you can find me experimenting with new frameworks, 
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
                    className="text-lg px-8 py-6 group flex items-center gap-3 relative overflow-hidden bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 rounded-lg font-semibold border-0 before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out data-[state=open]:scale-105 [&[data-state=open]>svg:last-child]:rotate-180"
                  >
                    <Briefcase className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">My Career</span>
                    <ChevronDown className="w-4 h-4 relative z-10 transition-transform duration-300" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-2 bg-popover/95 backdrop-blur-sm border-2 shadow-xl" 
                  align="end"
                  sideOffset={8}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="px-2 py-1.5 mb-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Work Experience
                      </p>
                    </div>
                    <Link
                      href="/career?company=spacesoft"
                      className="group relative flex items-start gap-3 rounded-lg px-4 py-3.5 transition-all duration-200 hover:bg-accent/80 hover:shadow-md border border-transparent hover:border-primary/20 cursor-pointer"
                    >
                      <div className="mt-0.5 p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                            SpaceSoft Ltd
                          </p>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Software Developer
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Aug 2025 - Present
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/career?company=fusion-infotech"
                      className="group relative flex items-start gap-3 rounded-lg px-4 py-3.5 transition-all duration-200 hover:bg-accent/80 hover:shadow-md border border-transparent hover:border-primary/20 cursor-pointer"
                    >
                      <div className="mt-0.5 p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                            Fusion Infotech Ltd
                          </p>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Junior Full Stack Engineer
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Nov 2024 - Aug 2025
                        </p>
                      </div>
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

