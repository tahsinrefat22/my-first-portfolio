import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NAVBAR_HEIGHT } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to a section by its ID
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Optional offset from the top (defaults to NAVBAR_HEIGHT)
 */
export function scrollToSection(sectionId: string, offset: number = NAVBAR_HEIGHT) {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
