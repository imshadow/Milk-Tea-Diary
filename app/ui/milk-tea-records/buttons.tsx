import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {deleteMilkTeaRecords} from '@/app/lib/actions';

export function CreateMilkTeaRecords() {
  return (
    <Link
      href="/dashboard/milk-tea-records/create"
      className="flex h-10 items-center rounded-lg bg-pink-600 px-4 text-sm font-medium text-white transition-colors hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">添加记录</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateMilkTeaRecords({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/milk-tea-records/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteMilkTeaRecords({ id }: { id: string }) {
  const deleteMilkTeaRecordsWithId = deleteMilkTeaRecords.bind(null, id);
  return (
    <form action={deleteMilkTeaRecordsWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
