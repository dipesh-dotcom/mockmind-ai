export type Role = {
  id: string;
  title: string;
  company: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  rating: number;
  tags: string[];
};
