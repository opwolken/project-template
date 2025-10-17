'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('World');

  const handleHello = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`/api/hello?name=${encodeURIComponent(name)}`);
      const data = await response.json();
      setMessage(data.message || JSON.stringify(data));
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleHealth = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setMessage(`Status: ${data.status} - ${data.message}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Project Template
        </h1>
        <p className="text-gray-600 mb-8">
          Next.js + Firebase Functions (Python)
        </p>

        <div className="space-y-4">
          {/* Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleHello}
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Say Hello'}
            </button>
            
            <button
              onClick={handleHealth}
              disabled={loading}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Health Check
            </button>
          </div>

          {/* Response message */}
          {message && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">
                API Response:
              </p>
              <p className="text-gray-800 font-mono text-sm">
                {message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>🔥 Firebase Hosting</span>
            <span>⚡ Live & Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
