import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>数据不存在.</p>
      <Link
        href="/dashboard/milk-tea-records"
        className="mt-4 rounded-md bg-pink-500 px-4 py-2 text-sm text-white transition-colors hover:bg-pink-400"
      >
        返回
      </Link>
    </main>
  );
}