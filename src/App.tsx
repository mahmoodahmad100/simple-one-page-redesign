import { useState, useEffect } from 'react';
import type { Skip } from './types/skip';
import { SkipCard } from './components/SkipCard';
import { fetchSkips } from './services/api';

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkips = async () => {
      try {
        const data = await fetchSkips();
        setSkips(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load skip data. Please try again later.');
        setLoading(false);
      }
    };

    loadSkips();
  }, []);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(selectedSkip?.id === skip.id ? null : skip);
  };

  const handleContinue = () => {
    // Handle continue action
    console.log('Continue with skip:', selectedSkip);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading available skips...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm w-full flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Skip Size</h1>
          <p className="mt-2 text-gray-600">Select the perfect skip size for your needs</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Skip Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={handleSkipSelect}
              />
            ))}
          </div>

          {/* Selection Summary and Continue Button */}
          {selectedSkip && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900">Selected Skip</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <p className="text-gray-600">
                        {selectedSkip.size} Yard Skip - {selectedSkip.hire_period_days} Days Hire
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        £{(selectedSkip.price_before_vat + (selectedSkip.price_before_vat * selectedSkip.vat) / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <p className={`text-sm ${selectedSkip.allowed_on_road ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedSkip.allowed_on_road ? '✓' : '✕'} {selectedSkip.allowed_on_road ? 'Allowed on road' : 'Not allowed on road'}
                      </p>
                      <p className={`text-sm ${selectedSkip.allows_heavy_waste ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedSkip.allows_heavy_waste ? '✓' : '✕'} {selectedSkip.allows_heavy_waste ? 'Accepts heavy waste' : 'Does not accept heavy waste'}
                      </p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500 italic">
                      Please note that the images and specifications displayed on this website are for illustrative purposes only. Actual skip dimensions, colors, and features may vary. Additional options and accessories may incur extra charges.
                    </p>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold text-lg"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 w-full flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Business Skip Hire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
