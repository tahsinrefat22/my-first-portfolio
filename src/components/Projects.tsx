import { ProjectsStage } from '@/components/projects-stage';

/*
  Five live products, one at a time. The section is a scroll-driven stage on every
  screen: each product covers the last, arriving from the left, right, bottom, then top.
  Reduced motion gets the same slides stacked.
*/
export default function Projects() {
  return <ProjectsStage />;
}
