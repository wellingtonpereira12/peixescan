import React from 'react';
import { Fish, Waves } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Fish size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">PeixeScan AI</h1>
            <p className="text-blue-100 text-xs font-medium">Identificador Inteligente de Espécies</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-1 opacity-80">
          <Waves size={20} />
          <span className="text-sm">Powered by Gemini</span>
        </div>
      </div>
    </header>
  );
};