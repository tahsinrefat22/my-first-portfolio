'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 324 323' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect
        x='88.1023'
        y='144.792'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 88.1023 144.792)'
        fill='currentColor'
      />
      <rect
        x='85.3459'
        y='244.537'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 85.3459 244.537)'
        fill='currentColor'
      />
    </svg>
  )
}

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315deg"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135deg"
    />
  </svg>
);

// Types
export interface Navbar03NavItem {
  href?: string;
  label: string;
  active?: boolean;
}

export interface Navbar03Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar03NavItem[];
  signInText?: string;
  ctaText?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
  onNavLinkClick?: (sectionId: string) => void;
  onLogoClick?: (sectionId: string) => void;
  rightSideContent?: React.ReactNode;
}

// Default navigation links
const defaultNavigationLinks: Navbar03NavItem[] = [
  { href: '#', label: 'Home', active: true },
  { href: '#', label: 'Features' },
  { href: '#', label: 'Pricing' },
  { href: '#', label: 'About' },
];

export const Navbar03 = React.forwardRef<HTMLElement, Navbar03Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '#',
      navigationLinks = defaultNavigationLinks,
      signInText = 'Sign In',
      ctaText = 'Get Started',
      onSignInClick,
      onCtaClick,
      onNavLinkClick,
      onLogoClick,
      rightSideContent,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
      const checkWidth = () => {
        // Use window.innerWidth for accurate viewport width
        // Show mobile menu on tablets (< 1024px) and mobile (< 768px)
        // Desktop navbar shows on screens >= 1024px
        const width = window.innerWidth;
        setIsMobile(width < 1024);
      };

      // Initial check
      checkWidth();

      // Listen for window resize
      window.addEventListener('resize', checkWidth);

      return () => {
        window.removeEventListener('resize', checkWidth);
      };
    }, []);

    // Combine refs
    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);
    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 **:no-underline',
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-14 md:h-16 max-w-screen-2xl items-center justify-between gap-1 md:gap-2 lg:gap-4">
          {/* Left side */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (onNavLinkClick && link.href) {
                                const sectionId = link.href.replace('#', '');
                                onNavLinkClick(sectionId);
                                // Close the popover after clicking a link
                                setIsPopoverOpen(false);
                              }
                            }}
                            className={cn(
                              'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline',
                              link.active && 'bg-accent text-accent-foreground'
                            )}
                          >
                            {link.label}
                          </button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-1 md:gap-2 lg:gap-4 xl:gap-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (logoHref) {
                    const sectionId = logoHref.replace('#', '');
                    if (onLogoClick) {
                      onLogoClick(sectionId);
                    } else if (onNavLinkClick) {
                      onNavLinkClick(sectionId);
                    }
                  }
                }}
                className="flex items-center space-x-1 md:space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-xl md:text-2xl">
                  {logo}
                </div>
                <span className="hidden font-bold text-lg md:text-xl xl:inline-block">shadcn.io</span>
              </button>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-0 md:gap-0.5 lg:gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            if (onNavLinkClick && link.href) {
                              const sectionId = link.href.replace('#', '');
                              onNavLinkClick(sectionId);
                            }
                          }}
                          className={cn(
                            'group inline-flex h-9 md:h-10 w-max items-center justify-center rounded-md px-1.5 md:px-2 lg:px-3 xl:px-4 py-2 text-[10px] md:text-xs lg:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 cursor-pointer relative',
                            'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-primary before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100',
                            link.active && 'before:scale-x-100 text-primary bg-accent'
                          )}
                          data-active={link.active}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
            {rightSideContent}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs md:text-sm font-medium hover:bg-accent hover:text-accent-foreground px-2 md:px-3 h-8 md:h-9"
              onClick={(e) => {
                e.preventDefault();
                if (onSignInClick) onSignInClick();
              }}
            >
              <span className="hidden md:inline">{signInText}</span>
              <span className="md:hidden">CV</span>
            </Button>
            <Button
              size="sm"
              className="text-xs md:text-sm font-medium px-2 md:px-3 lg:px-4 h-8 md:h-9 rounded-md shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                if (onCtaClick) onCtaClick();
              }}
            >
              <span className="hidden lg:inline">{ctaText}</span>
              <span className="lg:hidden">Hire</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

Navbar03.displayName = 'Navbar03';

export { Logo, HamburgerIcon };