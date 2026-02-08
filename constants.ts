import { QuizQuestion, QuizResult } from './types';

export const HERO_SECTION_ID = 'hero';
export const COLLAGE_SECTION_ID = 'collage';
export const REASONS_SECTION_ID = 'reasons'; // New ID for reasons section
export const EXPERIENCE_CHOOSER_SECTION_ID = 'experience-chooser';
export const QUIZ_SECTION_ID = 'quiz';
export const FINAL_SECTION_ID = 'final';
export const POST_PROPOSAL_COLLAGE_ID = 'post-proposal-collage'; // New ID for post-proposal collage display

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's our ideal Friday night?",
    options: [
      "Cozying up with movies and snacks",
      "Hitting the town for an adventure",
      "Deep talks over fancy drinks",
      "Trying a new craft or recipe together",
    ],
  },
  {
    id: 2,
    question: "When I need a pick-me-up, you usually...",
    options: [
      "Send a comforting message or a cute meme",
      "Drag me out for some fun distraction",
      "Listen patiently and offer wise advice",
      "Bring over my favorite comfort food",
    ],
  },
  {
    id: 3,
    question: "Our friendship is best described as...",
    options: [
      "A warm, fuzzy blanket",
      "A thrilling roller coaster",
      "A well-oiled support system",
      "A constant source of laughter and inside jokes",
    ],
  },
  {
    id: 4,
    question: "Which emoji best represents our dynamic?",
    options: ["💕", "✨", "👯‍♀️", "😂"],
  },
];

export const QUIZ_RESULTS: { [key: string]: QuizResult } = {
  "Soul Sisters": {
    title: "Soul Sisters",
    description: "You're two peas in a pod, connected by an unspoken bond and endless understanding.",
    image: "https://picsum.photos/400/300?grayscale&random=1",
  },
  "Chaos Besties": {
    title: "Chaos Besties",
    description: "Life's an adventure with you two! Always up for anything, bringing laughter and fun wherever you go.",
    image: "https://picsum.photos/400/300?grayscale&random=2",
  },
  "Soft Girl Duo": {
    title: "Soft Girl Duo",
    description: "Your friendship is a gentle breeze, filled with cozy moments, heartfelt chats, and comforting vibes.",
    image: "https://picsum.photos/400/300?grayscale&random=3",
  },
  "Ride or Die": {
    title: "Ride or Die",
    description: "Through thick and thin, you've got each other's backs. Unwavering loyalty and unbreakable support define your bond.",
    image: "https://picsum.photos/400/300?grayscale&random=4",
  },
};