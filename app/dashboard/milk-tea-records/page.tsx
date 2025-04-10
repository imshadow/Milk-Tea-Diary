import Pagination from '@/app/ui/milk-tea-records/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/milk-tea-records/table';
import { CreateMilkTeaRecords } from '@/app/ui/milk-tea-records/buttons';
import { lusitana } from '@/app/ui/fonts';
import { MilkTeaRecordsTableSkeleton} from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchMilkTeaRecordsPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '记录',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchMilkTeaRecordsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>记录</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="搜索记录..." />
        <CreateMilkTeaRecords />
      </div>
      <Suspense key={query + currentPage} fallback={<MilkTeaRecordsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
         <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
