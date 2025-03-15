import { useState, useEffect } from 'react';

interface GameProps {
  username: string;
}

export default function Game({ username }: GameProps) {
  const [destination, setDestination] = useState<any>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDestination = async () => {
    try {
      const response = await fetch('/api/destinations/random');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setDestination(data.destination);
      setOptions(data.options);
    } catch (err) {
      setError('Failed to fetch destination');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!destination) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Guess the City</h2>
        <div className="space-y-4">
          <p className="text-lg">Clues:</p>
          <ul className="list-disc pl-5">
            {destination.clues.map((clue: string, index: number) => (
              <li key={index}>{clue}</li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {/* Handle guess */}}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 