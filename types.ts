export type GalentineStep =
  'hero' |
  'collage' |
  'message' |
  'experience-choice' |
  'quiz' |
  'mood-board' |
  'final';

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

export interface MoodBoardVibe {
  id: string;
  name: string;
  colors: string[];
  words: string[];
  affirmations: string[];
  images: string[]; // URLs for images
}