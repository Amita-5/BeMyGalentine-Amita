import React, { useState, useCallback, useMemo } from 'react';
import Button from './Button';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../constants';
import { QuizQuestion, QuizResult } from '../types';

interface QuizSectionProps {
  onNext: (result: QuizResult) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onNext }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [showResult, setShowResult] = useState<boolean>(false);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswer = useCallback((questionId: number, answer: string) => {
    setAnswers((prev) => new Map(prev).set(questionId, answer));
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }, [currentQuestionIndex]);

  const calculateResult = useMemo((): QuizResult => {
    // A simple logic: count occurrences of answers to determine a vibe.
    // For a more robust quiz, a scoring system would be needed.
    const answerCounts: { [key: string]: number } = {};
    answers.forEach((answer) => {
      // Map answers to vibe categories based on general sentiment (simplification)
      if (answer.includes('Cozying up') || answer.includes('comforting message') || answer.includes('warm, fuzzy blanket') || answer.includes('💕')) {
        answerCounts['Soft Girl Duo'] = (answerCounts['Soft Girl Duo'] || 0) + 1;
      } else if (answer.includes('Hitting the town') || answer.includes('fun distraction') || answer.includes('thrilling roller coaster') || answer.includes('✨')) {
        answerCounts['Chaos Besties'] = (answerCounts['Chaos Besties'] || 0) + 1;
      } else if (answer.includes('Deep talks') || answer.includes('wise advice') || answer.includes('well-oiled support system') || answer.includes('👯‍♀️')) {
        answerCounts['Soul Sisters'] = (answerCounts['Soul Sisters'] || 0) + 1;
      } else if (answer.includes('new craft') || answer.includes('comfort food') || answer.includes('laughter and inside jokes') || answer.includes('😂')) {
        answerCounts['Ride or Die'] = (answerCounts['Ride or Die'] || 0) + 1;
      }
    });

    let maxCount = 0;
    let resultKey: string = 'Soul Sisters'; // Default
    for (const key in answerCounts) {
      if (answerCounts[key] > maxCount) {
        maxCount = answerCounts[key];
        resultKey = key;
      }
    }
    return QUIZ_RESULTS[resultKey as keyof typeof QUIZ_RESULTS];
  }, [answers]);

  return (
    <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl mx-auto w-full animate-fade-in delay-300">
      <h2 className="text-3xl md:text-5xl font-pacifico text-pink-600 mb-4">
        What Kind of Galentines Are We? 💕
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Answer a few fun questions to discover our friendship vibe!
      </p>

      {!showResult ? (
        <div className="animate-fade-in">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            <span className="text-pink-400">{currentQuestionIndex + 1}.</span> {currentQuestion.question}
          </h3>
          <div className="flex flex-col gap-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                variant={answers.get(currentQuestion.id) === option ? 'primary' : 'secondary'}
                onClick={() => handleAnswer(currentQuestion.id, option)}
                className="w-full text-left justify-start"
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleNextQuestion}
            disabled={!answers.has(currentQuestion.id)}
            className="mt-8"
            icon="➡️"
          >
            {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Our Vibe!'}
          </Button>
        </div>
      ) : (
        <div className="animate-fade-in delay-200">
          <h3 className="text-4xl font-pacifico text-pink-600 mb-4">
            You are a <span className="text-purple-500">{calculateResult.title}</span>!
          </h3>
          <img
            src={calculateResult.image}
            alt={calculateResult.title}
            className="mx-auto w-64 h-48 object-cover rounded-xl shadow-lg mb-6"
          />
          <p className="text-lg text-gray-700 mb-8">{calculateResult.description}</p>
          <Button onClick={() => onNext(calculateResult)} icon="💖">
            One Last Thing...
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizSection;