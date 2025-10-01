import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pool-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-pool-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-pool-500 hover:bg-pool-900 text-white">
              Return Home
            </Button>
          </Link>

          <div className="text-sm text-gray-600">
            <p className="mb-2">Need help?</p>
            <a
              href="tel:6313208271"
              className="text-pool-500 hover:text-pool-900 font-semibold"
            >
              Call us at (631) 320-8271
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
