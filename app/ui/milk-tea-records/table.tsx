import Image from 'next/image';
import { UpdateMilkTeaRecords, DeleteMilkTeaRecords } from '@/app/ui/milk-tea-records/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredMilkTeaRecords } from '@/app/lib/data';

export default async function MilkTeaRecordsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const records = await fetchFilteredMilkTeaRecords(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {records?.map((record) => (
              <div
                key={record.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={record.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${record.name}'s profile picture`}
                      />
                      <p>{record.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(record.amount)}
                    </p>
                    <p>{formatDateToLocal(record.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMilkTeaRecords id={record.id} />
                    <DeleteMilkTeaRecords id={record.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                奶茶
              </th>
              <th scope="col" className="px-3 py-5 pl-12 font-medium">
                金额
              </th>
              <th scope="col" className="px-3 py-5 pl-6 font-medium">
                日期
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                操作
              </th>
            </tr>
            </thead>
            <tbody className="bg-white">
            {records?.map((record) => (
                <tr
                  key={record.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={record.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${record.name}'s profile picture`}
                      />
                      <p>{record.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 pl-12">
                    {formatCurrency(record.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 pl-6">
                    {formatDateToLocal(record.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="flex justify-start gap-2">
                      <UpdateMilkTeaRecords id={record.id} />
                      <DeleteMilkTeaRecords id={record.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
