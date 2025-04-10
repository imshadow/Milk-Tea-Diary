import Form from '@/app/ui/milk-tea-records/edit-form';
import Breadcrumbs from '@/app/ui/milk-tea-records/breadcrumbs';
import { fetchMilkTeaRecordById, fetchMilkTeas } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '记录 | 编辑记录',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [records, milkTeas] = await Promise.all([
      fetchMilkTeaRecordById(id),
      fetchMilkTeas(),
  ]);

  if (!records) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '记录', href: '/dashboard/milk-tea-records' },
          {
            label: '编辑记录',
            href: `/dashboard/milk-tea-records/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form records={records} milkTeas={milkTeas} />
    </main>
  );
}
