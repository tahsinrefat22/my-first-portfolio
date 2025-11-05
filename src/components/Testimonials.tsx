'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    name: 'Craig Bator',
    role: 'CEO & Co Founder',
    company: 'Zendesk',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto',
    content: "Tahsin is an exceptional developer who delivers high-quality work on time. His expertise in full-stack development and AI is impressive.",
  },
  {
    id: 2,
    name: 'Martin Dorwart',
    role: 'Product manager',
    company: 'Orbit',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto',
    content: "Working with Tahsin has been a great experience. His attention to detail and problem-solving skills make him stand out.",
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Lead Designer',
    company: 'Figma',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto',
    content:
      "Tahsin's ability to understand complex requirements and translate them into elegant solutions is remarkable. Highly recommended!",
  },
  {
    id: 4,
    name: 'Alex Chen',
    role: 'Frontend Developer',
    company: 'Vercel',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto',
    content:
      'Tahsin has saved us countless hours in development. His component library knowledge and documentation skills are excellent.',
  },
];

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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-1"
                    style={{ willChange: 'opacity, transform' }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardContent className="flex flex-col grow p-6">
                        <p className="text-muted-foreground mb-6 grow leading-relaxed">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
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

