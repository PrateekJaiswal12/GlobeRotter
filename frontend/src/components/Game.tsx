import { useState, useEffect } from 'react';

interface GameProps {
  username: string;
}

interface Destination {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

export default function Game({ username }: GameProps) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revealedClueCount, setRevealedClueCount] = useState(1);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [selectedFunFact, setSelectedFunFact] = useState<string>('');
  const [score, setScore] = useState(0);

  const fetchDestination = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/destinations/random`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setDestination(data.destination);
      setOptions(data.options);
      setRevealedClueCount(1);
      setGameStatus('playing');
      setSelectedFunFact('');
    } catch (err) {
      setError('Failed to fetch destination');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  const handleGuess = (guessedCity: string) => {
    if (!destination) return;

    if (guessedCity === destination.city) {
      setGameStatus('won');
      setScore(prevScore => prevScore + 100); // Add 100 points for correct answer
      // Randomly select a fun fact to display
      const randomFunFact = destination.fun_fact[Math.floor(Math.random() * destination.fun_fact?.length)];
      setSelectedFunFact(randomFunFact);
    } else {
      setScore(prevScore => prevScore - 1); // Subtract 1 point for wrong answer
      if (revealedClueCount >= destination.clues.length) {
        setGameStatus('lost');
      } else {
        setRevealedClueCount(prev => prev + 1);
      }
    }
  };

  const playAgain = () => {
    setLoading(true);
    fetchDestination();
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    </div>
  );
  
  if (!destination) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Guess the City</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Player: {username}</p>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-blue-700 font-semibold">Score: {score}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Clues:</h3>
            <ul className="space-y-3">
              {destination.clues.slice(0, revealedClueCount).map((clue: string, index: number) => (
                <li 
                  key={index} 
                  className="flex items-start space-x-3 text-gray-700"
                >
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-lg">{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {gameStatus === 'playing' && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Choose your answer:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="w-full py-4 px-6 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => handleGuess(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameStatus === 'won' && (
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🎉</span>
                    <h3 className="text-2xl font-bold text-green-800">Correct!</h3>
                  </div>
                  <div className="bg-green-100 px-4 py-2 rounded-lg">
                    <p className="text-green-700 font-semibold">+100 points!</p>
                  </div>
                </div>
                <div className="bg-white bg-opacity-50 rounded-lg p-4">
                  <p className="text-lg text-green-700">
                    <span className="font-semibold">Fun Fact:</span> {selectedFunFact}
                  </p>
                </div>
              </div>
              <button
                onClick={playAgain}
                className="w-full py-4 px-6 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Play Again
              </button>
            </div>
          )}

          {gameStatus === 'lost' && (
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">😔</span>
                    <h3 className="text-2xl font-bold text-red-800">Game Over</h3>
                  </div>
                  <div className="bg-red-100 px-4 py-2 rounded-lg">
                    <p className="text-red-700 font-semibold">-1 point</p>
                  </div>
                </div>
                <div className="bg-white bg-opacity-50 rounded-lg p-4">
                  <p className="text-lg text-red-700">
                    The correct answer was: <span className="font-semibold">{destination.city}, {destination.country}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={playAgain}
                className="w-full py-4 px-6 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 