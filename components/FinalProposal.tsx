import React from 'react';
import Button from './Button';

interface FinalProposalProps {
  onPropose: () => void;
}

const FinalProposal: React.FC<FinalProposalProps> = ({ onPropose }) => {
  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-5xl md:text-7xl font-pacifico text-pink-600 mb-6 animate-scale-in">
        Will You Be My Galentine? 💕
      </h2>
      <p className="text-lg md:text-xl text-gray-700 mb-10 animate-fade-in delay-300">
        Today, tomorrow, and always.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Button onClick={onPropose} size="large" icon="💖" className="animate-wiggle-once">
          YES, ALWAYS 💖
        </Button>
        <Button onClick={onPropose} size="large" icon="🥹" className="animate-wiggle-once delay-200">
          Obviously 🥹
        </Button>
      </div>

      <p className="mt-12 text-md text-gray-600 italic animate-fade-in delay-500">
        Made with love 💕 Friendship looks good on you.
      </p>
    </div>
  );
};

export default FinalProposal;