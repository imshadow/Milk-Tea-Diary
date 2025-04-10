'use client';

import {MilkTeaRecordForm, MilkTeaField} from '@/app/lib/definitions';
import {
  CurrencyDollarIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateMilkTeaRecords, MilkTeaRecordsState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditMilkTeaRecordsForm({
                                          records,
                                          milkTeas,
}: {
  records: MilkTeaRecordForm;
  milkTeas: MilkTeaField[];
}) {
  const initialState: MilkTeaRecordsState = { message: null, errors: {} };
  const updateMilkTeaRecordsWithId = updateMilkTeaRecords.bind(null, records.id);
  const [state, formAction] = useActionState(updateMilkTeaRecordsWithId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* MilkTea Name */}
        <div className="mb-4">
          <label htmlFor="milkTea" className="mb-2 block text-sm font-medium">
            选择奶茶
          </label>
          <div className="relative">
            <select
              id="milkTea"
              name="milkTeaId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={records.milk_tea_id}
              aria-describedby="milkTea-error"
            >
              <option value="" disabled>
                选择奶茶
              </option>
              {milkTeas.map((milkTea) => (
                <option key={milkTea.id} value={milkTea.id}>
                  {milkTea.name}
                </option>
              ))}
            </select>
            <GiftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="milkTea-error" aria-live="polite" aria-atomic="true">
            {state.errors?.milkTeaId &&
            state.errors.milkTeaId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* MilkTeaRecords Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            输入金额
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={records.amount}
                placeholder="输入金额"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
            state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {
            state.errors &&
            <p className="mt-2 text-sm text-red-500 font-semibold">
              {state.message}
            </p>
          }
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/milk-tea-records"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">更新</Button>
      </div>
    </form>
  );
}
