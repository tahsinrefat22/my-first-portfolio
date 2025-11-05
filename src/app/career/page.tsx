'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { companyData } from '@/data/companyData';
import { TEAM_LINKS } from '@/data/teamLinks';

function CareerContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get('company');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const data = company ? companyData[company] : null;

  // Helper function to render text with links - memoized
  const renderTextWithLinks = useCallback((text: string) => {
    let result: (string | React.ReactElement)[] = [text];
    
    TEAM_LINKS.forEach((link) => {
      const newResult: (string | React.ReactElement)[] = [];
      result.forEach((part) => {
        if (typeof part === 'string') {
          const parts = part.split(link.text);
          parts.forEach((p, idx) => {
            if (p) newResult.push(p);
            if (idx < parts.length - 1) {
              newResult.push(
                <a
                  key={`${link.text}-${idx}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {link.text}
                </a>
              );
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });

    return result;
  }, []);

  // Get all images from lifeAtCompany - memoized
  const images = useMemo(() => {
    return data?.lifeAtCompany?.filter(item => item.image).map(item => item.image!) || [];
  }, [data]);
  
  const handleNext = useCallback(() => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent body scroll when lightbox is open
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrevious, closeLightbox]);

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Company Not Found</h1>
            <Link href="/#about">
              <Button>Go Back</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 py-12 md:py-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href="/#about">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to About
            </Button>
          </Link>
        </motion.div>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            <a
              href={data.linkedinUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors hover:underline"
            >
              {data.name}
            </a>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-muted-foreground">
            <p className="text-xl md:text-2xl font-medium">{data.title}</p>
            <span className="hidden md:inline">•</span>
            <p className="text-lg">{data.period}</p>
          </div>
        </motion.div>

        {/* Technologies */}
        {data.technologies && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {data.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About My Role</h2>
          <div className="space-y-4 text-muted-foreground">
            {data.description.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Life at Company */}
        {data.lifeAtCompany && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Life at {data.name}</h2>
            <div className="space-y-12">
              {data.lifeAtCompany.map((item, index) => {
                const isImageLeft = index % 2 === 0;
                // Find the image index in the images array
                const imageIndex = item.image ? images.findIndex(img => img === item.image) : -1;
                return (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                  >
                    {item.image && (
                      <>
                        {isImageLeft ? (
                          <>
                            <motion.div
                              initial={{ opacity: 0, x: -50, y: 50 }}
                              animate={{ opacity: 1, x: 0, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: 'easeOut' }}
                              className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group"
                              onClick={() => imageIndex >= 0 && openLightbox(imageIndex)}
                            >
                              <Image
                                src={item.image}
                                alt={`Life at ${data.name} - ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: 50, y: 50 }}
                              animate={{ opacity: 1, x: 0, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) + 0.1, ease: 'easeOut' }}
                            >
                              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                {renderTextWithLinks(item.text)}
                              </p>
                            </motion.div>
                          </>
                        ) : (
                          <>
                            <motion.div
                              initial={{ opacity: 0, x: -50, y: 50 }}
                              animate={{ opacity: 1, x: 0, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) + 0.1, ease: 'easeOut' }}
                              className="order-2 md:order-1"
                            >
                              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                {renderTextWithLinks(item.text)}
                              </p>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: 50, y: 50 }}
                              animate={{ opacity: 1, x: 0, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: 'easeOut' }}
                              className="relative w-full aspect-video rounded-lg overflow-hidden order-1 md:order-2 cursor-pointer group"
                              onClick={() => imageIndex >= 0 && openLightbox(imageIndex)}
                            >
                              <Image
                                src={item.image}
                                alt={`Life at ${data.name} - ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </motion.div>
                          </>
                        )}
                      </>
                    )}
                    {!item.image && (
                      <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: 'easeOut' }}
                        className="text-base md:text-lg leading-relaxed text-muted-foreground"
                      >
                        {item.text}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        {data.achievements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Key Achievements</h2>
            <ul className="space-y-3">
              {data.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-base md:text-lg leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      </div>

      {/* Lightbox Gallery */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors p-2 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Life at ${data.name} - ${currentImageIndex + 1}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default function CareerPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    }>
      <CareerContent />
    </Suspense>
  );
}

