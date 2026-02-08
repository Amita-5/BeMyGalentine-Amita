import React, { useState, useRef, useCallback } from 'react';
import {
  HERO_SECTION_ID,
  COLLAGE_SECTION_ID,
  REASONS_SECTION_ID, // Changed from MESSAGE_SECTION_ID
  EXPERIENCE_CHOOSER_SECTION_ID,
  QUIZ_SECTION_ID,
  FINAL_SECTION_ID,
  POST_PROPOSAL_COLLAGE_ID,
} from './constants';
import { GalentineStep, ImageUpload, CollageLayout, QuizResult } from './types';

// Import section components
import HeroSection from './components/HeroSection';
import CollageMaker from './components/CollageMaker';
import ReasonsSection from './components/ReasonsSection'; // New component
import ExperienceChooser from './components/ExperienceChooser';
import QuizSection from './components/QuizSection';
import FinalProposal from './components/FinalProposal';
import Confetti from './components/Confetti';
import FloatingHearts from './components/FloatingHearts';
import PostProposalCollageDisplay from './components/PostProposalCollageDisplay';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<GalentineStep>('hero');
  const [uploadedImages, setUploadedImages] = useState<ImageUpload[]>([]);
  const [collageLayout, setCollageLayout] = useState<CollageLayout>('grid');
  const [reasons, setReasons] = useState<string[]>([]); // Changed from personalMessage
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState<boolean>(true);
  const [showPostProposalCollage, setShowPostProposalCollage] = useState<boolean>(false);

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    collage: useRef<HTMLDivElement>(null),
    reasons: useRef<HTMLDivElement>(null), // Changed from message
    'experience-chooser': useRef<HTMLDivElement>(null),
    quiz: useRef<HTMLDivElement>(null),
    final: useRef<HTMLDivElement>(null),
    'post-proposal-collage': useRef<HTMLDivElement>(null),
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
      case 'reasons': // Changed from 'message'
        setUploadedImages(data.images);
        setCollageLayout(data.layout);
        scrollToSection(REASONS_SECTION_ID); // Changed from MESSAGE_SECTION_ID
        break;
      case 'experience-choice':
        setReasons(data.reasons); // Changed from setPersonalMessage
        scrollToSection(EXPERIENCE_CHOOSER_SECTION_ID);
        handleNext('quiz'); // Automatically go to quiz as mood board is removed
        break;
      case 'quiz':
        scrollToSection(QUIZ_SECTION_ID);
        break;
      case 'final':
        if (data?.quizResult) {
          setQuizResult(data.quizResult);
        }
        scrollToSection(FINAL_SECTION_ID);
        setShowConfetti(false);
        break;
      case 'post-proposal-collage':
        setCollageLayout('polaroid');
        setShowPostProposalCollage(true);
        scrollToSection(POST_PROPOSAL_COLLAGE_ID);
        break;
      default:
        break;
    }
    setCurrentStep(nextStep);
  }, [scrollToSection]);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  const handleAcceptProposal = useCallback(() => {
    triggerConfetti();
    handleNext('post-proposal-collage');
  }, [triggerConfetti, handleNext]);

  return (
    <div className="relative min-h-screen">
      {showFloatingHearts && <FloatingHearts />}
      <Confetti show={showConfetti} />

      <section id={HERO_SECTION_ID} ref={sectionRefs.hero} className="min-h-screen flex items-center justify-center p-4">
        <HeroSection onNext={() => handleNext('collage')} />
      </section>

      {(currentStep === 'collage' || currentStep === 'reasons' || currentStep === 'experience-choice' || currentStep === 'quiz' || currentStep === 'final' || currentStep === 'post-proposal-collage') && (
        <section id={COLLAGE_SECTION_ID} ref={sectionRefs.collage} className="min-h-screen flex items-center justify-center p-4 py-16">
          <CollageMaker onNext={(images, layout) => handleNext('reasons', { images, layout })} /> {/* Changed target step */}
        </section>
      )}

      {(currentStep === 'reasons' || currentStep === 'experience-choice' || currentStep === 'quiz' || currentStep === 'final' || currentStep === 'post-proposal-collage') && (
        <section id={REASONS_SECTION_ID} ref={sectionRefs.reasons} className="min-h-screen flex items-center justify-center p-4 py-16">
          <ReasonsSection onNext={(reasonsList) => handleNext('experience-choice', { reasons: reasonsList })} /> {/* New component */}
        </section>
      )}

      {(currentStep === 'experience-choice' || currentStep === 'quiz' || currentStep === 'final' || currentStep === 'post-proposal-collage') && (
        <section id={EXPERIENCE_CHOOSER_SECTION_ID} ref={sectionRefs['experience-chooser']} className="min-h-screen flex items-center justify-center p-4 py-16">
          <ExperienceChooser
            onNext={() => handleNext('quiz')}
          />
        </section>
      )}

      {(currentStep === 'quiz' || (currentStep === 'final' && quizResult) || currentStep === 'post-proposal-collage') && (
        <section id={QUIZ_SECTION_ID} ref={sectionRefs.quiz} className="min-h-screen flex items-center justify-center p-4 py-16">
          <QuizSection onNext={(result) => handleNext('final', { quizResult: result })} />
        </section>
      )}

      {(currentStep === 'final' || showPostProposalCollage) && (
        <section id={FINAL_SECTION_ID} ref={sectionRefs.final} className="min-h-screen flex items-center justify-center p-4 py-16">
          <FinalProposal onAcceptProposal={handleAcceptProposal} />
        </section>
      )}

      {showPostProposalCollage && (
        <section id={POST_PROPOSAL_COLLAGE_ID} ref={sectionRefs['post-proposal-collage']} className="min-h-screen flex items-center justify-center p-4 py-16">
          <PostProposalCollageDisplay images={uploadedImages} />
        </section>
      )}
    </div>
  );
};

export default App;