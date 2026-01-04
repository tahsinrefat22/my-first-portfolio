'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  image?: string;
  content: string;
}

// Sample testimonials data - replace with your actual testimonials
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Salahuddin Mahmud',
    role: 'Senior Full Stack Engineer',
    company: 'Fusion Infotech Ltd',
    image: '/salahuddin-mahmud.jpg',
    content: "I worked closely with him on a complex project and found him to be dedicated, reliable, and strong at problem-solving. He handled challenging responsibilities efficiently and showed a genuine interest in learning and improving. He consistently took initiative and contributed positively to the team.",
  },
  {
    id: 2,
    name: 'Minhajur Rahman Mahi',
    role: 'Jr Full Stack Engineer',
    company: 'Fusion Infotech Ltd',
    image: '/minhajur-rahman-mahi.jpeg',
    content: "I've had the pleasure of working with him as a colleague, and he is genuinely friendly, helpful, and always willing to guide others in solving problems. He consistently looks for creative and efficient approaches rather than settling for obvious solutions. Beyond his technical skills, he is very humble and has a keen eye for detail as a developer. Working with him is both productive and inspiring and fun also.",
  },
  {
    id: 3,
    name: 'Mahin Abrar',
    role: 'Senior Full Stack Engineer',
    company: 'Fusion Infotech Ltd',
    image: '/mahin-abrar.jpeg',
    content: "He excels in requirement analysis, quickly anticipating real-world scenarios, though occasionally drifting from the main architecture. His code is well-organized, well-documented, and follows standard practices. He is friendly, cooperative, calm, and adapt very quickly to new frameworks.",
  },
  {
    id: 4,
    name: 'Md Ashfakul Karim Kausik',
    role: 'Product Manager',
    company: 'Singularity Corporation',
    image: '/ashfak.jpeg',
    content: 'Working with Tahsin is highly energizing. He consistently finds smart, practical solutions when projects seem stuck. He excels at turning complex technical ideas into real results, and while he enjoys experimenting with new technologies, his impact is felt throughout the entire project lifecycle. From fixing production issues to optimizing performance or delivering last-minute features, he always gets the job done.',
  },
];

// Individual testimonial card component with expand/collapse
function TestimonialCard({ 
  testimonial, 
  index 
}: { 
  testimonial: Testimonial; 
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const COLLAPSED_HEIGHT = 100; // Height in pixels for collapsed state
  const CARD_COLLAPSED_HEIGHT = 280; // Fixed height for collapsed cards

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-1"
      style={{ willChange: 'opacity, transform' }}
    >
      <Card 
        className="flex flex-col transition-all duration-300 ease-in-out"
        style={{ 
          height: isExpanded ? 'auto' : `${CARD_COLLAPSED_HEIGHT}px`,
          minHeight: isExpanded ? 'auto' : `${CARD_COLLAPSED_HEIGHT}px`
        }}
      >
        <CardContent className="flex flex-col p-6">
          <div className="relative mb-4">
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isExpanded ? 'none' : `${COLLAPSED_HEIGHT}px`,
              }}
            >
              <p className="text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </div>
            {/* Gradient fade for collapsed state */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-card via-card/80 to-transparent pointer-events-none" />
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start text-primary hover:text-primary/80 text-xs md:text-sm h-auto p-0 mb-4 -mt-2"
          >
            {isExpanded ? 'Read Less' : 'Read More...'}
          </Button>

          <div className="flex items-center gap-4 mt-auto pt-2">
            <Avatar className="size-12">
              <AvatarImage
                src={testimonial.avatar || testimonial.image}
                alt={testimonial.name}
              />
              <AvatarFallback className="text-sm">
                {testimonial.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
                {testimonial.company && (
                  <>
                    {' '}
                    <span className="text-muted-foreground/60">·</span>{' '}
                    {testimonial.company}
                  </>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-background overflow-hidden py-16 md:py-24"
      style={{ willChange: 'opacity' }}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center">
          What People Think About Me
        </h2>

        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 top-auto md:top-1/2 -bottom-14 md:bottom-auto md:-translate-y-1/2" />
            <CarouselNext className="right-0 md:-right-12 top-auto md:top-1/2 -bottom-14 md:bottom-auto md:-translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </motion.section>
  );
}

