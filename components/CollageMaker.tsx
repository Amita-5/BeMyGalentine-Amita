import React, { useState, useCallback, useMemo } from 'react';
import Button from './Button';
import { ImageUpload, CollageLayout } from '../types';

const generateUniqueId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

interface CollageMakerProps {
  onNext: (images: ImageUpload[], layout: CollageLayout) => void;
}

const CollageMaker: React.FC<CollageMakerProps> = ({ onNext }) => {
  const [uploadedImages, setUploadedImages] = useState<ImageUpload[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<CollageLayout>('grid');

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Fix: Explicitly type `filesArray` and the `file` parameter in the map callback
      // to ensure TypeScript correctly recognizes `File` objects for `ImageUpload` and `URL.createObjectURL`.
      const filesArray: File[] = Array.from(event.target.files);
      if (uploadedImages.length + filesArray.length > 6) {
        alert('You can upload a maximum of 6 photos.');
        return;
      }
      const newImages: ImageUpload[] = filesArray.map((file: File) => ({
        id: generateUniqueId(),
        file,
        previewUrl: URL.createObjectURL(file),
        caption: '',
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
      event.target.value = ''; // Clear input for re-uploading same file
    }
  }, [uploadedImages]);

  const handleRemoveImage = useCallback((id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleCaptionChange = useCallback((id: string, text: string) => {
    setUploadedImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, caption: text } : img))
    );
  }, []);

  const handleStickerClick = useCallback((id: string, sticker: string) => {
    setUploadedImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, caption: img.caption + ' ' + sticker } : img))
    );
  }, []);

  const collageGridClass = useMemo(() => {
    switch (uploadedImages.length) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-2';
      case 5: case 6: return 'grid-cols-3';
      default: return 'grid-cols-1';
    }
  }, [uploadedImages.length]);

  const renderImage = useCallback((image: ImageUpload) => {
    const commonClasses = 'relative w-full h-40 object-cover rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105';
    let imageClasses = commonClasses;

    return (
      <div key={image.id} className="relative group">
        <img
          src={image.previewUrl}
          alt={`Uploaded photo ${image.id}`}
          className={imageClasses}
        />
        <button
          onClick={() => handleRemoveImage(image.id)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          aria-label="Remove image"
        >
          ✕
        </button>
        <textarea
          value={image.caption}
          onChange={(e) => handleCaptionChange(image.id, e.target.value)}
          placeholder="Add a caption..."
          className="mt-2 w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
          rows={2}
        />
        <div className="flex gap-1 mt-1 text-xl">
          {['💖', '✨', '🌟', '😊'].map((sticker, idx) => (
            <button
              key={idx}
              onClick={() => handleStickerClick(image.id, sticker)}
              className="hover:scale-125 transition-transform duration-150"
              aria-label={`Add ${sticker} sticker`}
            >
              {sticker}
            </button>
          ))}
        </div>
      </div>
    );
  }, [handleRemoveImage, handleCaptionChange, handleStickerClick]);

  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-4xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        Our Moments ✨
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Because our memories deserve their own space
      </p>

      <div className="mb-8 p-6 border-2 border-dashed border-pink-200 rounded-xl bg-pink-50 flex flex-col items-center justify-center space-y-4">
        <label htmlFor="file-upload" className="cursor-pointer text-pink-500 hover:text-pink-700 font-semibold text-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload 3-6 photos
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {uploadedImages.length > 0 && (
          <p className="text-sm text-gray-600">{uploadedImages.length} photos uploaded (Max 6)</p>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose a layout:</h3>
            <div className="flex justify-center gap-4">
              <Button
                variant={selectedLayout === 'grid' ? 'primary' : 'secondary'}
                onClick={() => setSelectedLayout('grid')}
                size="small"
              >
                Grid
              </Button>
              <Button
                variant={selectedLayout === 'stacked' ? 'primary' : 'secondary'}
                onClick={() => setSelectedLayout('stacked')}
                size="small"
              >
                Stacked
              </Button>
              <Button
                variant={selectedLayout === 'polaroid' ? 'primary' : 'secondary'}
                onClick={() => setSelectedLayout('polaroid')}
                size="small"
              >
                Polaroid
              </Button>
            </div>
          </div>

          <div className={`relative mb-8 p-4 bg-purple-50 rounded-2xl shadow-inner min-h-[300px] flex items-center justify-center`}>
            {selectedLayout === 'grid' && (
              <div className={`grid ${collageGridClass} gap-4 w-full max-w-3xl`}>
                {uploadedImages.map(renderImage)}
              </div>
            )}

            {selectedLayout === 'stacked' && (
              <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
                {uploadedImages.map(renderImage)}
              </div>
            )}

            {selectedLayout === 'polaroid' && (
              <div className="relative w-full max-w-3xl h-auto min-h-[400px]">
                {uploadedImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="absolute w-48 h-auto p-4 bg-white shadow-xl rounded-md transition-all duration-300 ease-out"
                    style={{
                      top: `${index * 20 + Math.random() * 20}px`,
                      left: `${index * 20 + Math.random() * 20}px`,
                      zIndex: uploadedImages.length - index,
                      transform: `rotate(${(Math.random() - 0.5) * 20}deg)`, // Random slight rotation
                    }}
                  >
                    <img
                      src={image.previewUrl}
                      alt={`Polaroid photo ${image.id}`}
                      className="w-full h-32 object-cover mb-2"
                    />
                    <button
                        onClick={() => handleRemoveImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs z-10"
                        aria-label="Remove image"
                    >
                        ✕
                    </button>
                    {/* Caption input for polaroid directly on the polaroid card */}
                    <textarea
                        value={image.caption}
                        onChange={(e) => handleCaptionChange(image.id, e.target.value)}
                        placeholder="Add a caption..."
                        className="mt-2 w-full p-1 text-xs border border-gray-200 rounded-md focus:ring-pink-300 focus:border-pink-300 resize-none"
                        rows={1}
                    />
                    <div className="flex gap-1 mt-1 text-lg justify-center">
                        {['💖', '✨', '🌟', '😊'].map((sticker, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleStickerClick(image.id, sticker)}
                                className="hover:scale-125 transition-transform duration-150"
                                aria-label={`Add ${sticker} sticker`}
                            >
                                {sticker}
                            </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <Button
        onClick={() => onNext(uploadedImages, selectedLayout)}
        disabled={uploadedImages.length === 0}
        className="mt-8"
        icon="🎀"
      >
        Next: Write Her a Message
      </Button>
    </div>
  );
};

export default CollageMaker;