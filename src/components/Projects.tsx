'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  link?: string;
}

// Sample projects data - replace with your actual projects
const projects: Project[] = [
  {
    id: 1,
    name: 'Project One',
    description: 'A full-stack web application built with React and Node.js that provides real-time collaboration features.',
    image: '/Project1.png',
    link: '#',
  },
  {
    id: 2,
    name: 'Project Two',
    description: 'An AI-powered machine learning platform for data analysis and predictive modeling.',
    image: '/Project2.png',
    link: '#',
  },
  {
    id: 3,
    name: 'Project Three',
    description: 'A responsive e-commerce website with payment integration and inventory management.',
    image: '/Project3.png',
    link: '#',
  },
//   {
//     id: 4,
//     name: 'Project Four',
//     description: 'A mobile-first social media application with real-time messaging and content sharing.',
//     image: '/project-4.jpg',
//     link: '#',
//   },
//   {
//     id: 5,
//     name: 'Project Five',
//     description: 'A cloud-based project management tool with team collaboration and task tracking.',
//     image: '/project-5.jpg',
//     link: '#',
//   },
];

export default function Projects() {
  const showCarousel = projects.length > 3;

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-background overflow-hidden pb-16 md:pb-24"
      style={{ willChange: 'opacity' }}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Recent Projects
          </h2>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View Github
            </a>
          </Button>
        </div>

        {showCarousel ? (
          <div className="relative">
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem key={project.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-1"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <Card className="h-full flex flex-col">
                        <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <CardContent className="flex flex-col grow p-6">
                          <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                          <p className="text-muted-foreground mb-4 grow">
                            {project.description}
                          </p>
                          <Button className="w-full" asChild>
                            <a href={project.link || '#'}>View</a>
                          </Button>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ willChange: 'opacity, transform' }}
              >
                <Card className="h-full flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="flex flex-col grow p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground mb-4 grow">
                    {project.description}
                  </p>
                  <Button className="w-full" asChild>
                    <a href={project.link || '#'}>View</a>
                  </Button>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

