'use client';

import { useState } from 'react';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { colors, shadows } from '@/lib/design-system';
import { Send, Trash2, Search, ExternalLink, Sparkles } from 'lucide-react';

interface SearchResult {
  title: string;
  url: string;
  content: string;
}

interface SearchInterfaceProps {
  enableSummarize?: boolean;
  maxResults?: number;
  title?: string;
}

export default function SearchInterface({
  enableSummarize = true,
  maxResults = 5,
  title = 'Web Search'
}: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [summary, setSummary] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [useSummarize, setUseSummarize] = useState(enableSummarize);
  const { execute, loading } = useAsyncAction();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const searchQuery = query.trim();
    setLastQuery(searchQuery);
    setResults([]);
    setSummary('');

    const result = await execute(
      async () => {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: searchQuery,
            max_results: maxResults,
            summarize: useSummarize
          })
        });

        if (!response.ok) {
          throw new Error('Search failed');
        }

        return response.json();
      },
      {
        successMessage: 'Zoeken voltooid',
        successDescription: `${useSummarize ? 'Samenvatting' : 'Resultaten'} gevonden`,
        errorMessage: 'Zoeken mislukt',
        errorDescription: 'Kon geen zoekresultaten ophalen'
      }
    );

    if (result) {
      if (useSummarize && result.summary) {
        setSummary(result.summary);
      } else if (result.results) {
        setResults(result.results);
      }
    }
  };

  const clearResults = () => {
    setResults([]);
    setSummary('');
    setLastQuery('');
    setQuery('');
  };

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600 mt-1">Powered by Tavily</p>
        </div>
        {(results.length > 0 || summary) && (
          <Button variant="ghost" size="sm" onClick={clearResults}>
            Wis resultaten
          </Button>
        )}
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek op het web..."
            disabled={loading}
            className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            variant="primary"
          >
            {loading ? 'Zoeken...' : 'Zoek'}
          </Button>
        </div>

        {enableSummarize && (
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={useSummarize}
              onChange={(e) => setUseSummarize(e.target.checked)}
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            AI samenvatting genereren (langzamer, maar meer gestructureerd)
          </label>
        )}
      </form>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">
            {useSummarize ? 'Zoeken en samenvatten...' : 'Zoeken...'}
          </p>
        </div>
      )}

      {/* Summary view */}
      {summary && !loading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="info">Samenvatting</Badge>
            <span className="text-sm text-neutral-600">voor &quot;{lastQuery}&quot;</span>
          </div>
          <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
            <p className="text-neutral-900 whitespace-pre-wrap leading-relaxed">
              {summary}
            </p>
          </div>
        </div>
      )}

      {/* Results view */}
      {results.length > 0 && !loading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="success">{results.length} resultaten</Badge>
            <span className="text-sm text-neutral-600">voor &quot;{lastQuery}&quot;</span>
          </div>
          
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 hover:border-neutral-300 transition-colors"
            >
              <h4 className="font-semibold text-neutral-900 mb-2">
                {result.title}
              </h4>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700 mb-2 block"
              >
                {result.url}
              </a>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {result.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !summary && results.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          <div className="text-4xl mb-3">🔍</div>
          <p>Voer een zoekopdracht in om te beginnen</p>
        </div>
      )}
    </Card>
  );
}
