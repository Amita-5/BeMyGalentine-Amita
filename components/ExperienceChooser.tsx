import React from 'react';
import Button from './Button';

interface ExperienceChooserProps {
  onSelectQuiz: () => void;
  onSelectMoodBoard: () => void;
}

const ExperienceChooser: React.FC<ExperienceChooserProps> = ({ onSelectQuiz, onSelectMoodBoard }) => {
  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        Ready for a little extra fun?
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Choose how we'll reveal our unique friendship vibe!
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Button
          onClick={onSelectQuiz}
          size="large"
          icon="💕"
          className="w-full md:w-auto"
        >
          Take a Fun Quiz!
        </Button>
        <Button
          onClick={onSelectMoodBoard}
          size="large"
          icon="🎨"
          className="w-full md:w-auto"
        >
          Explore Our Mood Board!
        </Button>
      </div>
    </div>
  );
};

export default ExperienceChooser;