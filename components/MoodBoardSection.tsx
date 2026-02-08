import React, { useState, useCallback, useMemo } from 'react';
import Button from './Button';
import { MOOD_BOARD_VIBES } from '../constants';
import { MoodBoardVibe } from '../types';

interface MoodBoardSectionProps {
  onNext: (vibe: MoodBoardVibe) => void;
}

const MoodBoardSection: React.FC<MoodBoardSectionProps> = ({ onNext }) => {
  const [selectedVibeId, setSelectedVibeId] = useState<string | null>(null);

  const selectedVibe: MoodBoardVibe | undefined = useMemo(() => {
    return MOOD_BOARD_VIBES.find((vibe) => vibe.id === selectedVibeId);
  }, [selectedVibeId]);

  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-4xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        Our Galentine Vibe ✨
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Pick a vibe that resonates with our special bond!
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {MOOD_BOARD_VIBES.map((vibe) => (
          <Button
            key={vibe.id}
            variant={selectedVibeId === vibe.id ? 'primary' : 'secondary'}
            onClick={() => setSelectedVibeId(vibe.id)}
            size="small"
          >
            {vibe.name}
          </Button>
        ))}
      </div>

      {selectedVibe && (
        <div className="p-6 bg-pink-50 rounded-2xl shadow-inner text-left animate-fade-in delay-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {selectedVibe.name} Mood Board
          </h3>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Colors:</h4>
            <div className="flex gap-2">
              {selectedVibe.colors.map((colorClass, index) => (
                <span
                  key={index}
                  className={`w-8 h-8 rounded-full shadow-md ${colorClass}`}
                ></span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Words:</h4>
            <p className="text-gray-600 italic">"{selectedVibe.words.join(', ')}"</p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Affirmations:</h4>
            <ul className="list-disc list-inside text-gray-600">
              {selectedVibe.affirmations.map((affirmation, index) => (
                <li key={index}>{affirmation}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Inspiration:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedVibe.images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Mood board inspiration ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => selectedVibe && onNext(selectedVibe)}
        disabled={!selectedVibe}
        className="mt-8"
        icon="💖"
      >
        Ask Her
      </Button>
    </div>
  );
};

export default MoodBoardSection;