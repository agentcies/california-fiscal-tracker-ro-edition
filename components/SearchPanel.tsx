
import React, { useState } from 'react';
import { Search, Loader2, ExternalLink, RefreshCcw } from 'lucide-react';
import { performAISearch } from '../services/gemini';
import { AISearchResult } from '../types';

export const SearchPanel: React.FC = () => {
  const [query, setQuery] = useState('Latest news on California 5% wealth tax and billionaire relocation');
  const [result, setResult] = useState<AISearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const data = await performAISearch(query);
    setResult(data);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          AI Fiscal Intelligence
        </h2>
        <p className="text-sm text-slate-500 mt-1">Grounding analysis via Google Search</p>
      </div>

      <div className="p-6 space-y-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about specific billionaires, tax measures, or migration data..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Analyze
          </button>
        </form>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="animate-pulse">Consulting live search results...</p>
          </div>
        ) : result ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {result.text}
            </div>

            {result.sources.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Grounding Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs transition-colors border border-slate-200"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
            <p>Perform a search to see real-time tax impact analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};
