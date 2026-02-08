import { QuizQuestion, MoodBoardVibe, QuizResult } from './types';

export const HERO_SECTION_ID = 'hero';
export const COLLAGE_SECTION_ID = 'collage';
export const MESSAGE_SECTION_ID = 'message';
export const EXPERIENCE_CHOOSER_SECTION_ID = 'experience-chooser';
export const QUIZ_SECTION_ID = 'quiz';
export const MOOD_BOARD_SECTION_ID = 'mood-board';
export const FINAL_SECTION_ID = 'final';

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

export const MOOD_BOARD_VIBES: MoodBoardVibe[] = [
  {
    id: 'soft-pink',
    name: 'Soft Pink',
    colors: ['bg-pink-100', 'bg-rose-200', 'bg-purple-100'],
    words: ['Gentle', 'Sweet', 'Dreamy', 'Affectionate'],
    affirmations: ['We bloom together.', 'Our bond is beautiful.', 'Love always wins.'],
    images: [
      'https://picsum.photos/300/200?random=5',
      'https://picsum.photos/300/200?random=6',
      'https://picsum.photos/300/200?random=7',
    ],
  },
  {
    id: 'cozy-coffee',
    name: 'Cozy Coffee',
    colors: ['bg-amber-100', 'bg-stone-200', 'bg-red-100'],
    words: ['Comfort', 'Warmth', 'Chat', 'Togetherness'],
    affirmations: ['Our conversations nourish my soul.', 'You are my safe space.', 'Every moment with you is a gift.'],
    images: [
      'https://picsum.photos/300/200?random=8',
      'https://picsum.photos/300/200?random=9',
      'https://picsum.photos/300/200?random=10',
    ],
  },
  {
    id: 'main-character-energy',
    name: 'Main Character Energy',
    colors: ['bg-yellow-200', 'bg-indigo-100', 'bg-lime-100'],
    words: ['Vibrant', 'Bold', 'Iconic', 'Adventure'],
    affirmations: ['We make every day an epic story.', 'Our friendship is a masterpiece.', 'Shining bright, together.'],
    images: [
      'https://picsum.photos/300/200?random=11',
      'https://picsum.photos/300/200?random=12',
      'https://picsum.photos/300/200?random=13',
    ],
  },
  {
    id: 'romantic-friendship',
    name: 'Romantic Friendship',
    colors: ['bg-rose-200', 'bg-sky-100', 'bg-fuchsia-100'],
    words: ['Devotion', 'Passion', 'Soulful', 'Eternal'],
    affirmations: ['You are truly special to me.', 'Our connection is profound.', 'Forever intertwined.'],
    images: [
      'https://picsum.photos/300/200?random=14',
      'https://picsum.photos/300/200?random=15',
      'https://picsum.photos/300/200?random=16',
    ],
  },
];