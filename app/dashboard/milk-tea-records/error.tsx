'use client';

import { useEffect } from 'react';

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">啊哦，服务器似乎开小差了!</h2>
      <button
        className="mt-4 rounded-md bg-pink-500 px-4 py-2 text-sm text-white transition-colors hover:bg-pink-400"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}