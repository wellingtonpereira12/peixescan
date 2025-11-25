import React from 'react';
import { FishAnalysis } from '../types';
import { Info, MapPin, Utensils, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ResultCardProps {
  data: FishAnalysis;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  // Determine color based on confidence
  const confidenceColor = data.confidence > 80 ? 'text-green-600' : data.confidence > 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-slate-100">
      <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{data.name}</h2>
          <p className="text-slate-500 italic font-serif text-lg">{data.scientificName}</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <ShieldCheck size={18} className={confidenceColor} />
          <span className={`font-semibold ${confidenceColor}`}>
            {data.confidence}% Confiança
          </span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Description & Habitat */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
              <Info size={20} />
              <h3>Descrição</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {data.description}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-teal-600 font-semibold mb-2">
              <MapPin size={20} />
              <h3>Habitat & Dieta</h3>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 space-y-2">
              <p className="text-slate-700 text-sm"><span className="font-medium text-teal-800">Habitat:</span> {data.habitat}</p>
              <p className="text-slate-700 text-sm"><span className="font-medium text-teal-800">Dieta:</span> {data.diet}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Edibility & Status */}
        <div className="space-y-6">
          <div>
             <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
              <Utensils size={20} />
              <h3>Gastronomia</h3>
            </div>
            <div className={`rounded-lg p-4 border ${data.edible ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                {data.edible ? (
                  <CheckCircle2 size={20} className="text-green-600" />
                ) : (
                  <AlertTriangle size={20} className="text-red-600" />
                )}
                <span className={`font-bold ${data.edible ? 'text-green-800' : 'text-red-800'}`}>
                  {data.edible ? 'Comestível' : 'Não Recomendado / Impróprio'}
                </span>
              </div>
              {data.cookingTips && (
                <p className="text-sm text-slate-600 mt-2">
                  <span className="font-medium">Dica:</span> {data.cookingTips}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Estado de Conservação</h3>
            <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm font-medium border border-slate-200">
              {data.conservationStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};