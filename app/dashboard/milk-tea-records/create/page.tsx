import Form from '@/app/ui/milk-tea-records/create-form';
import Breadcrumbs from '@/app/ui/milk-tea-records/breadcrumbs';
import { fetchMilkTeas } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '记录 | 添加',
};

export default async function Page() {
  const milkTeas = await fetchMilkTeas();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '记录', href: '/dashboard/milk-tea-records' },
          {
            label: '添加记录',
            href: '/dashboard/milk-tea-records/create',
            active: true,
          },
        ]}
      />
      <Form milkTeas={milkTeas} />
    </main>
  );
}
