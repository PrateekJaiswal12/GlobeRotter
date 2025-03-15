import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { IDestination } from '../models/Destination';

interface GameProps {
  username?: string;
}

const Game: React.FC<GameProps> = ({ username }) => {
  const [currentDestination, setCurrentDestination] = useState<IDestination | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchNewDestination();
  }, []);

  const fetchNewDestination = async () => {
    try {
      const response = await fetch('/api/destinations/random');
      const data = await response.json();
      setCurrentDestination(data.destination);
      setOptions(data.options);
      setSelectedAnswer('');
      setIsCorrect(null);
      setShowConfetti(false);
    } catch (error) {
      console.error('Error fetching destination:', error);
    }
  };

  const handleAnswer = async (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentDestination?.name;
    setIsCorrect(correct);
    
    if (correct) {
      setShowConfetti(true);
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    if (username) {
      try {
        await fetch('/api/users/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            correct,
          }),
        });
      } catch (error) {
        console.error('Error updating score:', error);
      }
    }
  };

  if (!currentDestination) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Guess the Destination</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {currentDestination.clues.slice(0, 2).map((clue, index) => (
              <p key={index} className="text-lg">{clue}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedAnswer}
            className={`p-4 text-lg font-semibold rounded-lg transition-colors
              ${selectedAnswer
                ? option === currentDestination.name
                  ? 'bg-green-500 text-white'
                  : option === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {isCorrect !== null && (
        <div className="mb-8">
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-bold mb-2">
              {isCorrect ? '🎉 Correct!' : '😢 Not quite right!'}
            </h3>
            <p className="text-lg">
              {isCorrect
                ? currentDestination.funFacts[0]
                : `The correct answer was ${currentDestination.name}. ${currentDestination.funFacts[0]}`}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-lg">
          Score: {score.correct} correct, {score.incorrect} incorrect
        </div>
        <button
          onClick={fetchNewDestination}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Next Destination
        </button>
      </div>
    </div>
  );
};

export default Game; 