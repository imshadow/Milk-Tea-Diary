import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {RevenueChartSkeleton, CardSkeleton, LatestRecordsSkeleton} from '@/app/ui/skeletons';
import LatestRecords from "@/app/ui/dashboard/latest-records";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '首页',
};

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                总览
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                 <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                 </Suspense>
                 <Suspense fallback={<LatestRecordsSkeleton />}>
                     <LatestRecords />
                 </Suspense>
            </div>
        </main>
    );
}