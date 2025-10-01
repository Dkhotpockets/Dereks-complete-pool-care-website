'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pool-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-pool-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-700 mb-6">
            We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={reset}
            className="w-full bg-pool-500 hover:bg-pool-900 text-white"
          >
            Try Again
          </Button>

          <div className="text-sm text-gray-600">
            <p className="mb-2">Need immediate assistance?</p>
            <a
              href="tel:6313208271"
              className="text-pool-500 hover:text-pool-900 font-semibold"
            >
              Call us at (631) 320-8271
            </a>
          </div>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-gray-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
