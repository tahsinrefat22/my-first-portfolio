import { ProjectsStage } from '@/components/projects-stage';

/*
  Six products, one at a time: five live ones from work, then Inkharbor. The section is a scroll-driven stage on every
  screen: each product covers the last, arriving from the left, right, bottom, then top.
  Reduced motion gets the same slides stacked.
*/
export default function Projects() {
  return <ProjectsStage />;
}
