// Navigation sections, in page order
export const NAVIGATION_SECTIONS = ['hero', 'expertise', 'about', 'projects', 'testimonials', 'contact'] as const;

export const NAV_LINKS: { href: `#${(typeof NAVIGATION_SECTIONS)[number]}`; label: string }[] = [
  { href: '#hero', label: 'Home' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

// Contact
export const CONTACT_EMAIL = 'tahsin92refat@gmail.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's work together")}`;

// CV
export const CV_PDF_PATH = '/Tahsin-Ahmed-Refat-CV.pdf';
export const CV_FILENAME = 'Tahsin-Ahmed-Refat-CV.pdf';

// GitHub: two real accounts, both surfaced deliberately
export const GITHUB_ACCOUNTS = [
  { handle: 'tahsinrefat', url: 'https://github.com/tahsinrefat' },
  { handle: 'tahsinrefat22', url: 'https://github.com/tahsinrefat22' },
] as const;

// Social
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/tahsinrefat22' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tahsinahmedrefat/' },
  { label: 'Facebook', href: 'https://www.facebook.com/tahsin.refat' },
  { label: 'Instagram', href: 'https://www.instagram.com/refattahsin' },
] as const;

// Layout
export const NAVBAR_HEIGHT = 64;

// Z-index scale. Use these and nothing else.
export const Z = {
  nav: 40,
  popover: 50,
  modal: 60,
  overlay: 70,
} as const;
