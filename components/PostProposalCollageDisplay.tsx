import React from 'react';
import { ImageUpload } from '../types';

interface PostProposalCollageDisplayProps {
  images: ImageUpload[];
}

const PostProposalCollageDisplay: React.FC<PostProposalCollageDisplayProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
        <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
          Our Special Moments
        </h2>
        <p className="text-lg text-gray-700">No images were uploaded to display.</p>
      </div>
    );
  }

  // Define the base width for the display area, then scale polaroids within it.
  const containerWidth = 600; // max-w-2xl is roughly 600-700px
  const polaroidCardWidth = 200; // Fixed width for each polaroid card
  const polaroidImageHeight = 150; // Fixed height for the image part within polaroid

  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        Our Memories, Our Forever Vibe ✨
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        A beautiful reminder of our friendship journey!
      </p>

      <div
        className="relative mx-auto"
        style={{ width: containerWidth, minHeight: images.length * 40 + polaroidImageHeight + 100 }} // Dynamic height
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="absolute p-3 bg-white shadow-xl rounded-md transition-all duration-300 ease-out"
            style={{
              width: polaroidCardWidth,
              top: `${index * 20 + Math.random() * 20}px`, // Staggered vertical position
              left: `${(index % 2) * (containerWidth - polaroidCardWidth - 40) + Math.random() * 20}px`, // Staggered horizontal
              zIndex: images.length - index,
              transform: `rotate(${(Math.random() - 0.5) * 15}deg)`, // Random slight rotation
            }}
          >
            <img
              src={image.previewUrl}
              alt={`Galentine photo ${image.id}`}
              className="w-full object-cover mb-2 rounded-sm"
              style={{ height: polaroidImageHeight }}
            />
            {image.caption && (
              <p className="text-xs text-gray-700 font-medium text-center break-words">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-16 text-md text-gray-600 italic animate-fade-in delay-500">
        Friendship looks good on us! 💖
      </p>
    </div>
  );
};

export default PostProposalCollageDisplay;