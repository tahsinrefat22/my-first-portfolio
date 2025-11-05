export interface CompanyData {
  name: string;
  title: string;
  period: string;
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
      'As a Junior Full Stack Engineer, I was responsible for many tasks related to the development of the ERPNext ERP system for the clients of Fusion Infotech Ltd. I have handled many tasks related to the development of the ERP system such as ID Card Design, Shift Management, Attendance/Checkin Management, SMS Integration with the system, Weekend Assignment, Employee Separation and various report generation etc.',
    ],
    technologies: ['ERPNext', 'Frappe', 'Python', 'JavaScript', 'HTML', 'CSS', 'MariaDB', 'Ubuntu'],
    lifeAtCompany: [
      { image: '/Fusion-1.png', text: 'In Fusion Infotech Ltd, my time was short, but the experience I gained was invaluable. I learned a lot about the ERP system and the development of the ERP system. I also had a great team full of helpful members and a great Team Lead who was always there to help me and guide me. For the first two weeks, he decided to ditch his own room and sit beside us, two of the interns just so that we could learn faster. And to be honest, it did really paid off. It was that evening when he sparked an interest in me about a framework I barely knew back then and motivated me to learn more about it. I have learned a lot from him and the other members.' },
      { image: '/Fusion-2.jpeg', text: 'In the company, I was able to work on many projects that boosted my skills and knowledge about ERP systems as a whole. In the early stages I was given tasks such as SMS Integration, ID Card Design and Route Assignment. Afterwards, I took on many of the complex tasks like handling sensitive data such as attendance and check-ins, worked on the shift management system such as shift reconciliation system, dynamic shift out margin time, weekend assignment, employee separation and various report generation etc which was a great learning experience for me.' },
      { image: '/Fusion-3.jpeg', text: 'My team consisted of Md. Atiqur Rahman (Team Lead), Mahin Abrar (Senior Full Stack Engineer), Salahuddin Mahmud (Senior Full Stack Engineer), Syed Ashiq (Software Quality Assurance Engineer) and myself (Junior Full Stack Engineer). Later on, 2 of the new members joined the team, Mahfuj Mahtab Mohot (Junior Full Stack Engineer) and Minhajur Rahman Mahi (Junior Full Stack Engineer). Every single day with the team was a fun and great learning experience. I pray and hope for the advnacement of the team and the company in future.' },
    ],
    achievements: [
      'Developed SMS Integration system for ERPNext to notify clients about attendance status and late entry notifications',
      'Designed and implemented ID Card Design print format for employee management',
      'Built Route Assignment system to optimize employee transportation logistics',
      'Handled sensitive data management including attendance and check-in systems',
      'Developed shift management features including shift reconciliation system and dynamic shift out margin time',
      'Implemented weekend assignment functionality for flexible work scheduling',
      'Created employee separation workflow and various report generation systems',
    ],
  },
  'spacesoft': {
    name: 'SpaceSoft Ltd',
    title: 'Software Developer',
    period: 'Aug 2025 - Present',
    linkedinUrl: 'https://www.linkedin.com/company/spacesoft-ltd/',
    description: [
      'As a Junior Software Developer, I was responsible for many tasks related to the development of the AI based web applications and GEO tools for SpaceSoft Ltd. I have handled many tasks related to the development of the web applications and APIs such as RESTful API, Team Project etc.',
    ],
    technologies: ['NextJS', 'ReactJS', 'Fastify', 'PayloadCMS', 'TailwindCSS', 'PostgreSQL', 'Temporal', 'Typescript', 'HTML', 'CSS', 'Docker', 'Ubuntu'],
    lifeAtCompany: [
      { image: '/SpaceSoft-1.png', text: 'In this company, I have been working on many projects that has boosted my skills and knowledge about the web development and the AI based web applications and GEO tools. Mostly it has also developed my ability to understand the codebase and the architecture of the projects as well as business logic and requirements.' },
      { image: '/SpaceSoft-2.png', text: 'In this company, I have worked on the AI Chatbot based Project named "Salestial AI" and a GEO tool named "RankFlo". Both these projects have been a great learning experience for me. I have gained knowledge about the AI based web applications and GEO tools as well as the development of the web applications and APIs, trending technologies and frameworks such as NextJS, ReactJS, Fastify, PayloadCMS, TailwindCSS, PostgreSQL, Temporal, Typescript, Docker.' },
      { image: '/SpaceSoft-3.png', text: 'I have a very good and helpful as well understanding team and a great Team Lead who is always there to help me and guide me. I have learned a lot from him and the other members of the team. My team consists of Afsan Rahmatullah (Team Lead), MD Ashfakul Karim Kausik (Product Manager), Ariful Islam (Sotware Developer), Sumit Das (Sotware Developer), and myself (Junior Software Developer).' },
    ],
    achievements: [
      'Developed AI-based web applications and GEO tools for SpaceSoft Ltd',
      'Worked on "Salestial AI" project, an AI RAG Chatbot-based application',
      'Contributed to "RankFlo" project, a GEO tool for location-based services',
      'Developed RESTful APIs for scalable web applications',
      'Developed APIs using TRPC',
      'Gained expertise in modern technologies including NextJS, ReactJS, Fastify, PayloadCMS, and Temporal',
      'Improved understanding of codebase architecture and business logic requirements',
    ],
  },
};

