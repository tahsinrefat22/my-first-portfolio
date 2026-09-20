export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'salahuddin',
    name: 'Salahuddin Mahmud',
    role: 'Senior Full Stack Engineer',
    company: 'Fusion Infotech Ltd',
    image: '/salahuddin-mahmud.jpg',
    quote:
      'I worked closely with him on a complex project and found him to be dedicated, reliable, and strong at problem-solving. He handled challenging responsibilities efficiently and showed a genuine interest in learning and improving. He consistently took initiative and contributed positively to the team.',
  },
  {
    id: 'minhajur',
    name: 'Minhajur Rahman Mahi',
    role: 'Junior Full Stack Engineer',
    company: 'Fusion Infotech Ltd',
    image: '/minhajur-rahman-mahi.jpeg',
    quote:
      "I've had the pleasure of working with him as a colleague, and he is genuinely friendly, helpful, and always willing to guide others in solving problems. He consistently looks for creative and efficient approaches rather than settling for obvious solutions. Beyond his technical skills, he is very humble and has a keen eye for detail as a developer. Working with him is both productive and inspiring and fun also.",
  },
  {
    id: 'mahin',
    name: 'Mahin Abrar',
    role: 'Senior Full Stack Engineer',
    company: 'Fusion Infotech Ltd',
    image: '/mahin-abrar.jpeg',
    quote:
      'He excels in requirement analysis, quickly anticipating real-world scenarios, though occasionally drifting from the main architecture. His code is well-organized, well-documented, and follows standard practices. He is friendly, cooperative, calm, and adapt very quickly to new frameworks.',
  },
  {
    id: 'ashfak',
    name: 'Md Ashfakul Karim Kausik',
    role: 'Product Manager',
    // Confirm: teamLinks.ts lists him at SpaceSoft. Left as originally written.
    company: 'Singularity Corporation',
    image: '/ashfak.jpeg',
    quote:
      'Working with Tahsin is highly energizing. He consistently finds smart, practical solutions when projects seem stuck. He excels at turning complex technical ideas into real results, and while he enjoys experimenting with new technologies, his impact is felt throughout the entire project lifecycle. From fixing production issues to optimizing performance or delivering last-minute features, he always gets the job done.',
  },
];
