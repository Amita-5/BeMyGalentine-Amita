import React, { useState, useEffect } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHearts = [...prev, Date.now()];
        // Remove hearts that are likely off-screen (e.g., older than their animation duration)
        return newHearts.filter(timestamp => Date.now() - timestamp < 13000); // Max duration is 13s
      });
    }, 500); // Generate a new heart every 0.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((timestamp) => {
        const size = Math.random() * 16 + 8; // 8-24px
        const left = Math.random() * 100; // 0-100%
        const delay = Math.random() * 2; // 0-2s
        const duration = Math.random() * 5 + 8; // 8-13s
        const opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7

        return (
          <span
            key={timestamp}
            className="absolute text-pink-300 animate-float-heart"
            style={{
              left: `${left}vw`,
              fontSize: `${size}px`,
              opacity: opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              top: '100%', // Start from bottom
            }}
          >
            💖
          </span>
        );
      })}
    </div>
  );
};

export default FloatingHearts;