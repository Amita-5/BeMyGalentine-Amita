import React, { useState, useRef, useCallback } from 'react';
import {
  HERO_SECTION_ID,
  COLLAGE_SECTION_ID,
  MESSAGE_SECTION_ID,
  EXPERIENCE_CHOOSER_SECTION_ID,
  QUIZ_SECTION_ID,
  MOOD_BOARD_SECTION_ID,
  FINAL_SECTION_ID,
} from './constants';
import { GalentineStep, ImageUpload, CollageLayout, QuizResult, MoodBoardVibe } from './types';

// Import section components
import HeroSection from './components/HeroSection';
import CollageMaker from './components/CollageMaker';
import MessageComposer from './components/MessageComposer';
import ExperienceChooser from './components/ExperienceChooser';
import QuizSection from './components/QuizSection';
import MoodBoardSection from './components/MoodBoardSection';
import FinalProposal from './components/FinalProposal';
import Confetti from './components/Confetti';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<GalentineStep>('hero');
  const [uploadedImages, setUploadedImages] = useState<ImageUpload[]>([]);
  const [collageLayout, setCollageLayout] = useState<CollageLayout>('grid');
  const [personalMessage, setPersonalMessage] = useState<string>('');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [selectedMoodVibe, setSelectedMoodVibe] = useState<MoodBoardVibe | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState<boolean>(true); // Optional enhancement

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    collage: useRef<HTMLDivElement>(null),
    message: useRef<HTMLDivElement>(null),
    'experience-chooser': useRef<HTMLDivElement>(null),
    quiz: useRef<HTMLDivElement>(null),
    'mood-board': useRef<HTMLDivElement>(null),
    final: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNext = useCallback((nextStep: GalentineStep, data?: any) => {
    switch (nextStep) {
      case 'collage':
        scrollToSection(COLLAGE_SECTION_ID);
        break;
      case 'message':
        setUploadedImages(data.images);
        setCollageLayout(data.layout);
        scrollToSection(MESSAGE_SECTION_ID);
        break;
      case 'experience-choice':
        setPersonalMessage(data.message);
        scrollToSection(EXPERIENCE_CHOOSER_SECTION_ID);
        break;
      case 'quiz':
        scrollToSection(QUIZ_SECTION_ID);
        break;
      case 'mood-board':
        scrollToSection(MOOD_BOARD_SECTION_ID);
        break;
      case 'final':
        if (data?.quizResult) {
          setQuizResult(data.quizResult);
        }
        if (data?.moodVibe) {
          setSelectedMoodVibe(data.moodVibe);
        }
        scrollToSection(FINAL_SECTION_ID);
        setShowConfetti(false); // Reset confetti before showing it again
        break;
      default:
        break;
    }
    setCurrentStep(nextStep);
  }, [scrollToSection]);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    // Hide confetti after some time
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  return (
    <div className="relative min-h-screen">
      {showFloatingHearts && <FloatingHearts />}
      <Confetti show={showConfetti} />

      <section id={HERO_SECTION_ID} ref={sectionRefs.hero} className="min-h-screen flex items-center justify-center p-4">
        <HeroSection onNext={() => handleNext('collage')} />
      </section>

      {(currentStep === 'collage' || currentStep === 'message' || currentStep === 'experience-choice' || currentStep === 'quiz' || currentStep === 'mood-board' || currentStep === 'final') && (
        <section id={COLLAGE_SECTION_ID} ref={sectionRefs.collage} className="min-h-screen flex items-center justify-center p-4 py-16">
          <CollageMaker onNext={(images, layout) => handleNext('message', { images, layout })} />
        </section>
      )}

      {(currentStep === 'message' || currentStep === 'experience-choice' || currentStep === 'quiz' || currentStep === 'mood-board' || currentStep === 'final') && (
        <section id={MESSAGE_SECTION_ID} ref={sectionRefs.message} className="min-h-screen flex items-center justify-center p-4 py-16">
          <MessageComposer onNext={(message) => handleNext('experience-choice', { message })} />
        </section>
      )}

      {(currentStep === 'experience-choice' || currentStep === 'quiz' || currentStep === 'mood-board' || currentStep === 'final') && (
        <section id={EXPERIENCE_CHOOSER_SECTION_ID} ref={sectionRefs['experience-chooser']} className="min-h-screen flex items-center justify-center p-4 py-16">
          <ExperienceChooser
            onSelectQuiz={() => handleNext('quiz')}
            onSelectMoodBoard={() => handleNext('mood-board')}
          />
        </section>
      )}

      {(currentStep === 'quiz' || (currentStep === 'final' && quizResult)) && (
        <section id={QUIZ_SECTION_ID} ref={sectionRefs.quiz} className="min-h-screen flex items-center justify-center p-4 py-16">
          <QuizSection onNext={(result) => handleNext('final', { quizResult: result })} />
        </section>
      )}

      {(currentStep === 'mood-board' || (currentStep === 'final' && selectedMoodVibe)) && (
        <section id={MOOD_BOARD_SECTION_ID} ref={sectionRefs['mood-board']} className="min-h-screen flex items-center justify-center p-4 py-16">
          <MoodBoardSection onNext={(vibe) => handleNext('final', { moodVibe: vibe })} />
        </section>
      )}

      {(currentStep === 'final' || showConfetti) && (
        <section id={FINAL_SECTION_ID} ref={sectionRefs.final} className="min-h-screen flex items-center justify-center p-4 py-16">
          <FinalProposal onPropose={triggerConfetti} />
        </section>
      )}
    </div>
  );
};

export default App;