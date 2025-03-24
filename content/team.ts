import type { QuizTags } from './quiz';
import teamYaml from './team.yaml';

type TeamMember = {
  id: string;
  name: string;
  letters: string;
  title: string;
  image: string;
  email: string;
  linkedin?: string;
  instagram?: string;
  tiktok?: string;
  psychologytoday?: string;
  tagline: string;
  badges?: string[];
  bio: string;

  // data for quiz form
  tags?: QuizTags;
};

const team: TeamMember[] = teamYaml.members;
export { team, type TeamMember };
export default team;
