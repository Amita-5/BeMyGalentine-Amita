import React from 'react';
import Button from './Button';

interface ExperienceChooserProps {
  onNext: () => void; // Renamed from onSelectQuiz
}

const ExperienceChooser: React.FC<ExperienceChooserProps> = ({ onNext }) => {
  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        Ready for a little extra fun?
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Let's discover our unique friendship vibe!
      </p>

      <div className="flex justify-center">
        <Button
          onClick={onNext} // Calls onNext directly
          size="large"
          icon="💕"
          className="w-full md:w-auto"
        >
          Take a Fun Quiz!
        </Button>
      </div>
    </div>
  );
};

export default ExperienceChooser;