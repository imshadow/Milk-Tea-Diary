import Table from '@/app/ui/milk-teas/table';
import {fetchFilteredMilkTeas} from '@/app/lib/data';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '奶茶',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const milkTeas = await fetchFilteredMilkTeas(query);

    return <Table milkTeas={milkTeas}/>;
}
