export interface CompanyData {
  name: string;
  title: string;
  period: string;
  /** Shown under the title on the career page, e.g. a transfer within the same group */
  note?: string;
  /** A few words of the same, for the compact timeline row */
  noteShort?: string;
  description: string[];
  technologies?: string[];
  lifeAtCompany?: Array<{ image?: string; text: string }>;
  achievements?: string[];
  linkedinUrl?: string;
}

export const companyData: Record<string, CompanyData> = {
  'fusion-infotech': {
    name: 'Fusion Infotech Ltd',
    title: 'Junior Full Stack Engineer',
    period: 'Nov 2024 - Aug 2025',
    linkedinUrl: 'https://www.linkedin.com/company/fusion-info-tech/posts/?feedView=all',
    description: [
      'At Fusion Infotech I built features for the ERPNext systems the company runs for its clients. The work covered most of the HR side of an ERP: ID card print formats, shift management, attendance and check-in handling, SMS notifications, weekend assignment, employee separation, and a long list of reports.',
    ],
    technologies: ['ERPNext', 'Frappe', 'Python', 'JavaScript', 'HTML', 'CSS', 'MariaDB', 'Ubuntu'],
    lifeAtCompany: [
      { image: '/Fusion-1.png', text: 'My time at Fusion Infotech was short, but it shaped how I work. I learned what an ERP system really is and how one gets built, and I did it inside a team that went out of its way to help. For my first two weeks the team lead left his own room and sat next to the two of us interns so we could pick things up faster, and it worked. One evening he got me curious about a framework I barely knew at the time and pushed me to dig into it. A lot of what I know, I learned from him and from the rest of that team.' },
      { image: '/Fusion-2.jpeg', text: 'The projects there gave me a real grounding in ERP work. I started with smaller pieces: SMS integration, the ID card design, route assignment. Once those were in, I moved on to the sensitive parts of the system, attendance and check-in data, and then to shift management: the shift reconciliation system, dynamic shift out margin time, weekend assignment, employee separation, and a range of reports. Each of those taught me something about how businesses actually run.' },
      { image: '/Fusion-3.jpeg', text: 'The team was Md. Atiqur Rahman (Team Lead), Mahin Abrar (Senior Full Stack Engineer), Salahuddin Mahmud (Senior Full Stack Engineer), Syed Ashiq (Software Quality Assurance Engineer) and myself as Junior Full Stack Engineer. Later, Mahfuj Mahtab Mohot (Junior Full Stack Engineer) and Minhajur Rahman Mahi (Junior Full Stack Engineer) joined us. Every day with them was good work and good company, and I wish the team and the company well.' },
    ],
    achievements: [
      'Built the SMS integration for ERPNext that notifies clients about attendance status and late entries',
      'Designed and implemented the ID card print format for employee management',
      'Built the route assignment system for employee transport logistics',
      'Handled sensitive attendance and check-in data end to end',
      'Delivered shift management features: shift reconciliation and dynamic shift out margin time',
      'Implemented weekend assignment for flexible scheduling',
      'Created the employee separation workflow and a range of generated reports',
    ],
  },
  'spacesoft': {
    name: 'SpaceSoft Ltd, now Softwarelify',
    title: 'Software Developer',
    period: 'Aug 2025 - Present',
    note: 'Transferred within the group to Softwarelify, a sister company under the same ownership, in August 2026. Same team, same products.',
    noteShort: 'Transferred within the group, Aug 2026. Same team.',
    linkedinUrl: 'https://www.linkedin.com/company/spacesoft-ltd/',
    description: [
      'At SpaceSoft I work on AI-driven web products and the APIs behind them: RESTful and tRPC services, background jobs, and the front ends that sit on top. The two main products are Salestial AI, a RAG-based chatbot platform, and Rankflo, a generative engine optimization tool that tracks how brands show up in AI answers.',
      'In August 2026 the whole team moved to Softwarelify, a sister company under the same ownership, and the work on the same products carries on there.',
    ],
    technologies: ['NextJS', 'ReactJS', 'Fastify', 'PayloadCMS', 'TailwindCSS', 'PostgreSQL', 'Temporal', 'Typescript', 'HTML', 'CSS', 'Docker', 'Ubuntu'],
    lifeAtCompany: [
      { image: '/SpaceSoft-1.png', text: 'This is where I grew from a junior into a developer who can own a feature. The products here are AI-driven web applications, and building them has sharpened how I read a codebase, how I reason about its architecture, and how I turn business requirements into working software.' },
      { image: '/SpaceSoft-2.png', text: 'The two projects I have spent most of my time on are Salestial AI, an AI chatbot platform built on retrieval-augmented generation, and Rankflo, a GEO tool that measures brand visibility across ChatGPT, Gemini, Claude and Perplexity. Between them I have worked across the whole stack: Next.js and React on the front, Fastify and Payload CMS on the back, PostgreSQL for data, Temporal for workflows, TypeScript throughout, and Docker for shipping it.' },
      { image: '/SpaceSoft-3.png', text: 'I have a team that is generous with its time and a team lead who is always there when I need direction, and I have learned a great deal from all of them. The team is Afsan Rahmatullah (Team Lead), MD Ashfakul Karim Kausik (Product Manager), Ariful Islam (Software Developer), Sumit Sarker (Software Developer), Sanjid Ahmed Sakib (Digital Marketer), and myself.' },
    ],
    achievements: [
      'Built AI-driven web applications and GEO tooling for SpaceSoft, now Softwarelify',
      'Worked on Salestial AI, a RAG-based AI chatbot platform',
      'Contributed to Rankflo, a generative engine optimization tool for brand visibility in AI answers',
      'Designed RESTful APIs for scalable web applications',
      'Built typed APIs with tRPC',
      'Gained depth in NextJS, ReactJS, Fastify, PayloadCMS and Temporal',
      'Grew at reading codebase architecture and translating business logic into requirements',
    ],
  },
};
