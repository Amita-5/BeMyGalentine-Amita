import React from 'react';

interface ConfettiProps {
  show: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ show }) => {
  if (!show) return null;

  const confettiColors = ['#FADCD9', '#FFC0CB', '#F0E6FA', '#D4F0F0', '#FFEFD5']; // Pastel colors

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 10 + 5; // 5-15px
        const left = Math.random() * 100; // 0-100%
        const delay = Math.random() * 2; // 0-2s
        const duration = Math.random() * 3 + 5; // 5-8s
        const rotation = Math.random() * 360;

        return (
          <div
            key={i}
            className="absolute opacity-0 animate-confetti"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
              left: `${left}vw`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `rotate(${rotation}deg)`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px', // Some circles, some squares
              '--duration': `${duration}s`, // Pass custom properties for animation
              '--delay': `${delay}s`,
            } as React.CSSProperties} // Cast to CSSProperties for custom properties
          />
        );
      })}
    </div>
  );
};

export default Confetti;