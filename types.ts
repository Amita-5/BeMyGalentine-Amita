export type GalentineStep =
  'hero' |
  'collage' |
  'reasons' | // Changed from 'message'
  'experience-choice' |
  'quiz' |
  'final' |
  'post-proposal-collage';

export interface ImageUpload {
  id: string;
  file: File;
  previewUrl: string;
  caption: string;
}

export type CollageLayout = 'grid' | 'stacked' | 'polaroid';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface QuizResult {
  title: string;
  description: string;
  image: string; // URL for illustration
}