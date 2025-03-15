'use client';

import { useState, useEffect } from 'react';
import Game from '@/components/Game';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string>('');
  const [shareUrl, setShareUrl] = useState<string>('');
  const [shareTitle, setShareTitle] = useState<string>('');

  useEffect(() => {
    // Set share URL and title only on client side
    setShareUrl(`${window.location.origin}?invite=${username}`);
    setShareTitle(`Join me in playing Globetrotter! I've scored ${0} points. Can you beat me?`);
  }, [username]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:3001/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsRegistered(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to register');
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center text-black bg-gray-200">
      {!isRegistered ? (
        <div className="max-w-md mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome to Globetrotter!</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Choose a username to start playing
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-1 py-2 rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Playing
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto p-4 flex flex-col justify-between items-center">
              <h1 className="text-2xl font-bold">Globetrotter </h1>
              <div className="flex items-center space-x-4">
                <span className='text-2xl italic'> Playing as: {username}</span>
                {shareUrl && (
                  <WhatsappShareButton url={shareUrl} title={shareTitle}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2">
                      <WhatsappIcon size={24} round />
                      <span>Challenge Friends</span>
                    </button>
                  </WhatsappShareButton>
                )}
              </div>
            </div>
          </div>
          <Game username={username} />
        </div>
      )}
    </main>
  );
}
