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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Github, ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    name: 'My Portfolio',
    description: 'A modern, responsive personal portfolio website showcasing my skills, projects, and career journey. Built with Next.js, React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and a clean, professional design with sections for expertise, projects, testimonials, and contact information.',
    image: '/Portfolio.png',
    link: 'https://github.com/tahsinrefat22/my-first-portfolio',
  },
  {
    id: 2,
    name: 'Kenakata.com',
    description: 'A frontend website for e-commerce website for buying and selling products. Built with HTML, CSS, JavaScript. I built it during my 2nd year of university, for the frontend course of the semester.',
    image: '/2nd-year-project.png',
    link: 'https://github.com/tahsinrefat/tahsinrefat.github.io',
  },
  {
    id: 3,
    name: 'Todo Management System',
    description: 'A todo management system with a responsive UI built with ReactJS, Spring Boot and MySQL. It has a login/register system and a todo list with a CRUD operation. JWT authentication is used for the login/register system.',
    image: '/tms.png',
    link: 'https://github.com/tahsinrefat/todo-management-system.git',
  },
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="lg"
                className="text-lg px-8 py-6 group flex items-center gap-3 relative overflow-hidden bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 rounded-lg font-semibold border-0 before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out data-[state=open]:scale-105 [&[data-state=open]>svg:last-child]:rotate-180"
              >
                <Github className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View Github</span>
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
                    GitHub Profiles
                  </p>
                </div>
                <Link
                  href="https://github.com/tahsinrefat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-start gap-3 rounded-lg px-4 py-3.5 transition-all duration-200 hover:bg-accent/80 hover:shadow-md border border-transparent hover:border-primary/20 cursor-pointer"
                >
                  <div className="mt-0.5 p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Github className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                        tahsinrefat
                      </p>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      github.com/tahsinrefat
                    </p>
                  </div>
                </Link>
                <Link
                  href="https://github.com/tahsinrefat22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-start gap-3 rounded-lg px-4 py-3.5 transition-all duration-200 hover:bg-accent/80 hover:shadow-md border border-transparent hover:border-primary/20 cursor-pointer"
                >
                  <div className="mt-0.5 p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Github className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                        tahsinrefat22
                      </p>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      github.com/tahsinrefat22
                    </p>
                  </div>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
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

