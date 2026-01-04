'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar03, type Navbar03NavItem } from '@/components/ui/shadcn-io/navbar-03';
import ThemeToggle from '@/components/ThemeToggle';
import { CustomLogo } from '@/components/CustomLogo';
import { scrollToSection } from '@/lib/utils';
import { CONTACT_EMAIL, CV_PDF_PATH, NAVIGATION_SECTIONS } from '@/lib/constants';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);

  // Smooth scroll function with active section update
  const handleScrollToSection = (sectionId: string) => {
    setIsScrolling(true);
    scrollToSection(sectionId);

    // Wait for smooth scroll to complete, then update active section
    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + 80;
      
      let newActiveSection = 'hero';
      
      // Default to hero if at the very top
      if (window.scrollY < 100) {
        setActiveSection('hero');
        setIsScrolling(false);
        return;
      }
      
      // Find which section we're in
      for (let i = NAVIGATION_SECTIONS.length - 1; i >= 0; i--) {
        const sectionId = NAVIGATION_SECTIONS[i];
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const elementTop = sectionElement.offsetTop;
          
          if (scrollPosition >= elementTop) {
            newActiveSection = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(newActiveSection);
      setIsScrolling(false);
    };

    // Check multiple times to ensure we catch when scroll completes
    setTimeout(checkActiveSection, 600);
    setTimeout(checkActiveSection, 1000);
  };

  // Track active section on scroll
  useEffect(() => {
    
    const getActiveSection = (): string => {
      const scrollPosition = window.scrollY + 80; // Add offset to account for navbar
      
      // Default to hero if at the very top
      if (window.scrollY < 100) {
        return 'hero';
      }

      // Find which section the middle of the viewport is currently in
      let currentSection = 'hero';
      
      for (let i = NAVIGATION_SECTIONS.length - 1; i >= 0; i--) {
        const sectionId = NAVIGATION_SECTIONS[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          
          // If we've scrolled past this section's top, it's the active one
          if (scrollPosition >= elementTop) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      return currentSection;
    };
    
    const handleScroll = () => {
      // Don't update during programmatic scroll to avoid flickering
      if (isScrolling) {
        return;
      }

      const newActiveSection = getActiveSection();
      setActiveSection(newActiveSection);
    };

    // Use throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isScrolling]);

  // Customize navigation links with dynamic active state
  const navigationLinks: Navbar03NavItem[] = [
    { href: '#hero', label: 'Home', active: activeSection === 'hero' },
    { href: '#expertise', label: 'Expertise', active: activeSection === 'expertise' },
    { href: '#about', label: 'About', active: activeSection === 'about' },
    { href: '#projects', label: 'Projects', active: activeSection === 'projects' },
    { href: '#testimonials', label: 'Testimonials', active: activeSection === 'testimonials' },
    { href: '#contact', label: 'Contact', active: activeSection === 'contact' },
  ];

  // Function to download CV PDF
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = CV_PDF_PATH;
    link.download = 'Tahsin-Ahmed-Refat-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle logo click - navigate to root or scroll to hero
  const handleLogoClick = (sectionId: string) => {
    if (pathname === '/') {
      // If on root page, scroll to hero
      scrollToSection(sectionId);
    } else {
      // If on another page, navigate to root
      router.push('/');
    }
  };

  return (
    <Navbar03
      logo={<CustomLogo />}
      logoHref="#hero"
      navigationLinks={navigationLinks}
      signInText="Download My CV"
      ctaText="Hire Me"
      rightSideContent={<ThemeToggle />}
      onSignInClick={downloadCV}
      onCtaClick={() => {
        // Open email client with mailto link
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=Hiring Inquiry&body=Hello Tahsin,%0D%0A%0D%0AI am interested in discussing potential opportunities with you.`;
      }}
      onNavLinkClick={handleScrollToSection}
      onLogoClick={handleLogoClick}
    />
  );
};

export default Navbar;