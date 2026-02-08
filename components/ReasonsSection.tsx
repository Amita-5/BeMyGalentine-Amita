import React, { useState, useCallback, useRef, useEffect } from 'react';
import Button from './Button';

interface ReasonsSectionProps {
  onNext: (reasons: string[]) => void;
}

const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

const MAX_REASONS = 7;

const ReasonsSection: React.FC<ReasonsSectionProps> = ({ onNext }) => {
  const [newReasonInput, setNewReasonInput] = useState<string>('');
  const [reasonsList, setReasonsList] = useState<{ id: string; text: string }[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editedCardText, setEditedCardText] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddReason = useCallback(() => {
    const trimmedReason = newReasonInput.trim();
    if (trimmedReason && reasonsList.length < MAX_REASONS) {
      setReasonsList((prev) => [...prev, { id: generateUniqueId(), text: trimmedReason }]);
      setNewReasonInput('');
      inputRef.current?.focus();
    }
  }, [newReasonInput, reasonsList]);

  const handleRemoveReason = useCallback((id: string) => {
    setReasonsList((prev) => prev.filter((reason) => reason.id !== id));
  }, []);

  const handleEditClick = useCallback((id: string, text: string) => {
    setEditingCardId(id);
    setEditedCardText(text);
  }, []);

  const handleSaveEdit = useCallback((id: string) => {
    const trimmedText = editedCardText.trim();
    if (trimmedText) {
      setReasonsList((prev) =>
        prev.map((reason) => (reason.id === id ? { ...reason, text: trimmedText } : reason))
      );
      setEditingCardId(null);
      setEditedCardText('');
    }
  }, [editedCardText]);

  const handlePresetClick = useCallback((presetText: string) => {
    setNewReasonInput(presetText);
  }, []);

  const handleSubmit = useCallback(() => {
    // Only pass the text content of the reasons
    onNext(reasonsList.map((reason) => reason.text));
  }, [reasonsList, onNext]);

  const isAddButtonDisabled = !newReasonInput.trim() || reasonsList.length >= MAX_REASONS;
  const isContinueButtonDisabled = reasonsList.length === 0 || editingCardId !== null;

  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        Reasons I Chose You 💕
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Little reasons that make you my person
      </p>

      {/* Input for new reasons */}
      <div className="mb-6 flex flex-col gap-4 items-center">
        <input
          ref={inputRef}
          type="text"
          className="w-full p-3 text-lg border border-pink-200 rounded-xl shadow-inner focus:ring-pink-300 focus:border-pink-300 transition-all duration-200"
          placeholder="e.g., You always hype me up when I doubt myself"
          value={newReasonInput}
          onChange={(e) => setNewReasonInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !isAddButtonDisabled) handleAddReason(); }}
          aria-label="Add a new reason"
        />
        <Button
          onClick={handleAddReason}
          disabled={isAddButtonDisabled}
          icon="➕"
          variant="secondary"
        >
          Add another reason
        </Button>
        {reasonsList.length >= MAX_REASONS && (
          <p className="text-sm text-red-500">Maximum of {MAX_REASONS} reasons reached!</p>
        )}
      </div>

      {/* Preset suggestion buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePresetClick("You make me feel safe 😌")}
        >
          You make me feel safe
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePresetClick("You make ordinary days special ✨")}
        >
          You make ordinary days special
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePresetClick("You feel like home 🏡")}
        >
          You feel like home
        </Button>
      </div>

      {/* Live preview of reason cards */}
      {reasonsList.length > 0 && (
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {reasonsList.map((reason, index) => (
            <div
              key={reason.id}
              className="relative p-4 bg-pink-100/80 rounded-xl shadow-md text-gray-800 text-left transition-all duration-300 ease-out transform hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {editingCardId === reason.id ? (
                <textarea
                  className="w-full p-2 text-sm border border-pink-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 resize-none"
                  value={editedCardText}
                  onChange={(e) => setEditedCardText(e.target.value)}
                  onBlur={() => handleSaveEdit(reason.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSaveEdit(reason.id); } }}
                  aria-label={`Edit reason: ${reason.text}`}
                  rows={2}
                />
              ) : (
                <p className="text-base font-medium whitespace-pre-wrap">{reason.text}</p>
              )}

              <div className="absolute top-2 right-2 flex gap-1">
                {editingCardId === reason.id ? (
                  <button
                    onClick={() => handleSaveEdit(reason.id)}
                    className="bg-green-400 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                    aria-label="Save reason"
                  >
                    ✓
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(reason.id, reason.text)}
                    className="bg-purple-300 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                    aria-label="Edit reason"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => handleRemoveReason(reason.id)}
                  className="bg-red-400 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition-opacity"
                  aria-label="Remove reason"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue CTA */}
      <Button
        onClick={handleSubmit}
        disabled={isContinueButtonDisabled}
        icon="✨"
      >
        Continue
      </Button>

      <p className="mt-12 text-md text-gray-600 italic animate-fade-in delay-500">
        This part is made with love 💗 She's lucky to have you.
      </p>
    </div>
  );
};

export default ReasonsSection;