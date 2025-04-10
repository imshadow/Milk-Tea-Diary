import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  FormattedMilkTeasTable,
} from '@/app/lib/definitions';

export default async function MilkTeasTable({
  milkTeas,
}: {
  milkTeas: FormattedMilkTeasTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        奶茶
      </h1>
      <Search placeholder="搜索奶茶..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {milkTeas?.map((milkTea) => (
                  <div
                    key={milkTea.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={milkTea.image_url}
                              className="rounded-full"
                              alt={`${milkTea.name}'s profile picture`}
                              width={48}
                              height={48}
                            />
                            <p>{milkTea.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">平均价格</p>
                        <p className="font-medium">{milkTea.average_amount}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">总金额</p>
                        <p className="font-medium">{milkTea.total_amount}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{milkTea.total_count} 杯</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      名称
                    </th>
                    <th scope="col" className="px-3 py-5 pr-6 font-medium">
                      总杯数
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      平均价格
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      总金额
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {milkTeas.map((milkTea) => (
                    <tr key={milkTea.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={milkTea.image_url}
                            className="rounded-full"
                            alt={`${milkTea.name}'s profile picture`}
                            width={48}
                            height={48}
                          />
                          <p>{milkTea.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 pr-6 text-sm">
                        {milkTea.total_count}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {milkTea.average_amount}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {milkTea.total_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
