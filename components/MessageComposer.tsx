import React, { useState, useCallback } from 'react';
import Button from './Button';

interface MessageComposerProps {
  onNext: (message: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onNext }) => {
  const [personalMessage, setPersonalMessage] = useState<string>('');

  const handlePresetClick = useCallback((presetText: string) => {
    setPersonalMessage(presetText);
  }, []);

  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        A Little Note, From Me to You 💌
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Thank you for being my safe place, my hype woman, and my forever friend 💕
      </p>

      <textarea
        className="w-full h-40 p-4 text-lg border border-pink-200 rounded-xl shadow-inner focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 resize-none mb-6"
        placeholder="Write your heartfelt message here..."
        value={personalMessage}
        onChange={(e) => setPersonalMessage(e.target.value)}
      ></textarea>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePresetClick("Thank you for being my safe place, my hype woman, and my forever friend 💕")}
        >
          Soft & Emotional
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePresetClick("You're the Lorelai to my Rory, the Tina to my Amy, the best kind of chaos I could ask for! 😂")}
        >
          Funny & Chaotic
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePresetClick("Just wanted to say how much I appreciate you. You're simply the best, bestie! ✨")}
        >
          Bestie Appreciation
        </Button>
      </div>

      <Button
        onClick={() => onNext(personalMessage)}
        disabled={!personalMessage.trim()}
        icon="✨"
      >
        Reveal Our Vibe
      </Button>
    </div>
  );
};

export default MessageComposer;