'use client';

import { useState, useRef, useCallback } from 'react';
import { Facebook, Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollToSection } from '@/lib/utils';
import { NAVIGATION_SECTIONS } from '@/lib/constants';

// Navigation links
const navigationLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

// Social links
const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/tahsin.refat', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/tahsinahmedrefat/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/tahsinrefat22', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/refattahsin?utm_source=qr&igsh=NW94aGM0bDJtM3M=', label: 'Instagram' },
];

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const textElementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Throttle mouse move handler for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (textElementRef.current) {
      const rect = textElementRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the text element itself
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is within the bounds of the text area (with some padding)
      const isOverText = x >= -200 && x <= rect.width + 200 && y >= -100 && y <= rect.height + 100;
      
      if (isOverText) {
        setMousePosition({ x, y });
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    }
  }, []);


  return (
    <motion.footer
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative bg-background border-t overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main footer content */}
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col items-center gap-6">
          {/* Navigation Links - Centered, side by side */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {navigationLinks.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  const sectionId = link.href.replace('#', '');
                  scrollToSection(sectionId);
                }}
                className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none cursor-pointer relative text-muted-foreground before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-primary before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* Social Links - Below navigation, no title */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            className="border-t pt-6 w-full text-center text-muted-foreground text-sm"
          >
            <p>&copy; {new Date().getFullYear()} Tahsin Ahmed Refat. All rights reserved.</p>
          </motion.div>
        </div>
      </div>

      {/* Large "Tahsin" text with illumination effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[200px] md:h-[300px] pointer-events-none overflow-hidden"
        ref={textRef}
      >
        {/* Illuminated text layer - follows cursor, only visible on hover */}
        <div
          ref={textElementRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[120px] md:text-[200px] lg:text-[280px] font-bold leading-none select-none whitespace-nowrap dark:text-white/20 text-black/20"
          style={{
            opacity: isHovering ? 1 : 0,
            maskImage: isHovering && mousePosition.x > 0 && mousePosition.y > 0
              ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 60%)`
              : 'none',
            WebkitMaskImage: isHovering && mousePosition.x > 0 && mousePosition.y > 0
              ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 60%)`
              : 'none',
            transition: 'opacity 0.2s ease-out',
            willChange: 'opacity, mask-image, -webkit-mask-image',
          }}
        >
          Tahsin
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

