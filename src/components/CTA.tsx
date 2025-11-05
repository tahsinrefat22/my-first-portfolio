'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CONTACT_EMAIL, CV_PDF_PATH } from '@/lib/constants';

export default function CTA() {
  // Function to download CV PDF
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = CV_PDF_PATH;
    link.download = 'Tahsin-Ahmed-Refat-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative bg-linear-to-br from-primary/10 via-primary/5 to-background overflow-hidden py-16 md:py-24"
      style={{ willChange: 'opacity' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0" />
      
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Ready to Work Together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto"
          >
            Let's bring your ideas to life. I'm always open to discussing new projects,
            creative ideas, or opportunities to be part of your vision.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 group w-full sm:w-auto"
              onClick={() => {
                // Open email client with mailto link
                window.location.href = `mailto:${CONTACT_EMAIL}?subject=Let's Work Together&body=Hello Tahsin,%0D%0A%0D%0AI am interested in discussing potential opportunities with you.`;
              }}
            >
              Get In Touch
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 w-full sm:w-auto"
              onClick={downloadCV}
            >
              Download My CV
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

