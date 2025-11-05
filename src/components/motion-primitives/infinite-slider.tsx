'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  direction?: 'left' | 'right';
}

export function InfiniteSlider({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 112,
  direction = 'left',
  className,
  ...props
}: InfiniteSliderProps) {
  const [hovered, setHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const animationIdRef = React.useRef<number | null>(null);
  const currentXRef = React.useRef(0);

  // Initialize - duplicate children to have at least 10 items
  const initialItems = React.useMemo(() => {
    const childArray = React.Children.toArray(children);
    const minItems = 10;
    const timesToRepeat = Math.ceil(minItems / childArray.length);
    return Array.from({ length: timesToRepeat }, () => childArray).flat();
  }, [children]);

  React.useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    if (!slider || !container) return;

    const animate = () => {
      if (!slider || !container || slider.children.length === 0) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const currentSpeed = hovered ? speedOnHover : speed;
      
      if (direction === 'left') {
        currentXRef.current -= currentSpeed / 60;
        
        const firstChild = slider.children[0] as HTMLElement;
        const firstChildRect = firstChild.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Check if first item has completely exited viewport on the left
        if (firstChildRect.right <= containerRect.left) {
          // Move first child to the end directly in DOM
          slider.appendChild(firstChild);
          
          // Adjust transform to compensate for the DOM change
          const firstChildWidth = firstChild.offsetWidth + gap;
          currentXRef.current += firstChildWidth;
        }
      } else {
        currentXRef.current += currentSpeed / 60;
        
        const lastChild = slider.children[slider.children.length - 1] as HTMLElement;
        const lastChildRect = lastChild.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Check if last item has completely exited viewport on the right
        if (lastChildRect.left >= containerRect.right) {
          // Move last child to the beginning directly in DOM
          slider.insertBefore(lastChild, slider.children[0]);
          
          // Adjust transform to compensate for the DOM change
          const lastChildWidth = lastChild.offsetWidth + gap;
          currentXRef.current -= lastChildWidth;
        }
      }

      slider.style.transform = `translateX(${currentXRef.current}px)`;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [speed, speedOnHover, direction, gap, hovered]);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <div
        ref={sliderRef}
        className="flex w-max"
        style={{
          gap: `${gap}px`,
        }}
      >
        {initialItems.map((item, index) => (
          <div key={`item-${index}`}>{item}</div>
        ))}
      </div>
    </div>
  );
}