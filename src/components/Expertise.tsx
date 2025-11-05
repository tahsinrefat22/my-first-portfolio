'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';

export default function Expertise() {
  return (
    <motion.section
      id="expertise"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-background overflow-hidden py-16"
      style={{ willChange: 'opacity' }}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">My Expertise</h2>
      </div>
      <div className="group relative container mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Programming Languages</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={112}
            >
              <div className="flex items-center justify-center">
                <Image
                  src="/python.png"
                  alt="Python"
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/javascript.png"
                  alt="JavaScript"
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/Java.png"
                  alt="Java"
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/C.png"
                  alt="C"
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/C++.png"
                  alt="C++"
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/C%23.png"
                  alt="C#"
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </InfiniteSlider>
            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
      {/* Frameworks Section */}
      <div className="group relative container mx-auto max-w-screen-2xl px-4 md:px-6 mt-8">
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={112}
              direction="right"
            >
              <div className="flex items-center justify-center">
                <Image
                  src="/reactjs.png"
                  alt="React.js"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/nextjs.png"
                  alt="Next.js"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/spring-boot.png"
                  alt="Spring Boot"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/python-django.png"
                  alt="Django"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/fastify.png"
                  alt="Fastify"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/ERPNext.png"
                  alt="ERPNext"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/frappe.png"
                  alt="Frappe"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </InfiniteSlider>
            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
          <div className="md:max-w-44 md:border-l md:pl-6">
            <p className="text-start text-sm">Frameworks</p>
          </div>
        </div>
      </div>
      {/* Database and OS Section */}
      <div className="group relative container mx-auto max-w-screen-2xl px-4 md:px-6 mt-8">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Database, OS and DevOps</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={112}
            >
              <div className="flex items-center justify-center">
                <Image
                  src="/MySQL.png"
                  alt="MySQL"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/postgres-sql.png"
                  alt="PostgreSQL"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/mariadb.png"
                  alt="MariaDB"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/oracle-sql-logo-removebg-preview.png"
                  alt="Oracle SQL"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/ubuntu.png"
                  alt="Ubuntu"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/docker.png"
                  alt="Docker"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </InfiniteSlider>
            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

