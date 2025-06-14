'use client';

import { useState } from 'react';

interface Shortcut {
  id: string;
  name: string;
  description: string;
  icon: string;
  uri: string;
  color: string;
}

const shortcuts: Shortcut[] = [
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Launch Windows Calculator',
    icon: '🧮',
    uri: 'andrejlauncher://calculator',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Open LinkedIn in browser',
    icon: '💼',
    uri: 'https://www.linkedin.com/',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'explorer',
    name: 'Windows Explorer',
    description: 'Open File Explorer',
    icon: '📁',
    uri: 'andrejlauncher://explorer',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'terminal',
    name: 'Windows Terminal',
    description: 'Launch Windows Terminal',
    icon: '💻',
    uri: 'andrejlauncher://terminal',
    color: 'bg-gray-700 hover:bg-gray-800'
  }
];

export default function Dashboard() {
  const [clickedShortcut, setClickedShortcut] = useState<string | null>(null);

  const handleShortcutClick = (shortcut: Shortcut) => {
    setClickedShortcut(shortcut.id);
    
    // Create a temporary link element to trigger the URI scheme
    const link = document.createElement('a');
    link.href = shortcut.uri;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset the clicked state after a short delay
    setTimeout(() => setClickedShortcut(null), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🚀</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Application Dashboard Demo</h1>
                <p className="text-gray-300 text-sm">Quick access to your favorite apps</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-300 text-sm">Powered by andrejlauncher</p>
              <p className="text-gray-400 text-xs">Custom URI scheme launcher</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Click on any shortcut below to launch the corresponding application using the andrejlauncher URI scheme.
          </p>
        </div>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.id}
              className={`group relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                clickedShortcut === shortcut.id 
                  ? 'ring-4 ring-yellow-400 ring-opacity-50' 
                  : 'hover:ring-2 hover:ring-white/20'
              }`}
              onClick={() => handleShortcutClick(shortcut)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 ${shortcut.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-4">{shortcut.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{shortcut.name}</h3>
                <p className="text-white/80 text-sm">{shortcut.description}</p>
                
                {/* Click indicator */}
                {clickedShortcut === shortcut.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                )}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">How it works</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">andrejlauncher URI Scheme</h4>
              <p className="text-gray-300 mb-4">
                This dashboard uses a custom URI scheme called "andrejlauncher://" to launch applications on your system. 
                When you click a shortcut, it triggers the registered URI handler.
              </p>
              <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-green-400">
                andrejlauncher://application-name
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Setup Required</h4>
              <p className="text-gray-300 mb-4">
                Make sure you have the andrejlauncher.py script registered in your system. 
                Run it as administrator to register the URI scheme.
              </p>
              <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-yellow-400">
                python andrejlauncher.py
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
