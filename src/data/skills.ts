export interface Skill {
  name: string;
  logo: string;
  /** The mark is essentially black, so in dark mode hover keeps it inverted (white) rather than vanishing */
  darkMark?: boolean;
  /** An opaque app-icon tile: greyed at rest but never inverted, since a dark tile with a black glyph is wrong */
  tile?: boolean;
}

export interface SkillGroup {
  label: string;
  items: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', logo: '/python.png' },
      { name: 'JavaScript', logo: '/javascript.png' },
      { name: 'TypeScript', logo: '/typescript.png' },
      { name: 'Java', logo: '/Java.png' },
      { name: 'C', logo: '/C.png' },
      { name: 'C++', logo: '/C++.png' },
      { name: 'C#', logo: '/C%23.png' },
    ],
  },
  {
    label: 'Frameworks and platforms',
    items: [
      { name: 'React', logo: '/reactjs.png' },
      { name: 'Next.js', logo: '/nextjs.png', darkMark: true },
      { name: 'NestJS', logo: '/nestjs.png' },
      { name: 'Spring Boot', logo: '/spring-boot.png' },
      { name: 'Django', logo: '/python-django.png' },
      { name: 'Fastify', logo: '/fastify.png', darkMark: true },
      { name: 'ERPNext', logo: '/ERPNext.png' },
      { name: 'Frappe', logo: '/frappe.png', darkMark: true },
      { name: 'GoHighLevel', logo: '/gohighlevel.png', darkMark: true },
      { name: 'Shopify', logo: '/shopify.png', darkMark: true },
      { name: 'Payload CMS', logo: '/payloadcms.png', darkMark: true },
      { name: 'Sveltia CMS', logo: '/sveltiacms.png', tile: true },
    ],
  },
  {
    label: 'Data and infrastructure',
    items: [
      { name: 'MySQL', logo: '/MySQL.png' },
      { name: 'PostgreSQL', logo: '/postgres-sql.png' },
      { name: 'MariaDB', logo: '/mariadb.png', darkMark: true },
      { name: 'Oracle', logo: '/oracle-sql-logo-removebg-preview.png' },
      { name: 'Ubuntu', logo: '/ubuntu.png' },
      { name: 'Nginx', logo: '/nginx.png' },
      { name: 'Docker', logo: '/docker.png' },
      { name: 'AWS', logo: '/aws.png', darkMark: true },
      { name: 'Hostinger', logo: '/hostinger.png' },
    ],
  },
];
