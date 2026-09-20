import { ProjectsStage } from '@/components/projects-stage';

/*
  Five live products, one at a time. On large screens the section is a scroll-driven
  stage: each product covers the last, arriving from the left, right, bottom, then top.
  Smaller screens and reduced motion get the same slides stacked.
*/
export default function Projects() {
  return <ProjectsStage />;
}
