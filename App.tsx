import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { identifyFish } from './services/geminiService';
import { FishAnalysis, AnalysisStatus } from './types';
import { Loader2, Search } from 'lucide-react';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<FishAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (base64: string) => {
    setImage(base64 || null);
    // Reset states when image changes
    setResult(null);
    setStatus(AnalysisStatus.IDLE);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setStatus(AnalysisStatus.ANALYZING);
    setError(null);

    try {
      const data = await identifyFish(image);
      setResult(data);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(AnalysisStatus.ERROR);
      setError("Não foi possível identificar o peixe. Verifique sua chave API ou tente uma imagem mais clara.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />

      <main className="max-w-3xl mx-auto px-4 pt-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">
            Qual é esse <span className="text-blue-600">peixe?</span>
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto">
            Carregue uma foto da sua pescaria ou aquário e deixe nossa Inteligência Artificial descobrir a espécie, habitat e dicas culinárias.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <ImageUploader 
            onImageSelected={handleImageSelected} 
            disabled={status === AnalysisStatus.ANALYZING} 
          />

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={!image || status === AnalysisStatus.ANALYZING}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-md
                ${!image 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : status === AnalysisStatus.ANALYZING
                    ? 'bg-blue-400 text-white cursor-wait'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }
              `}
            >
              {status === AnalysisStatus.ANALYZING ? (
                <>
                  <Loader2 className="animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Identificar Peixe
                </>
              )}
            </button>
          </div>
        </div>

        {status === AnalysisStatus.ERROR && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center mb-8 animate-fade-in">
            <p className="font-semibold">Ops! Algo deu errado.</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {status === AnalysisStatus.SUCCESS && result && (
          <ResultCard data={result} />
        )}
      </main>
    </div>
  );
};

export default App;