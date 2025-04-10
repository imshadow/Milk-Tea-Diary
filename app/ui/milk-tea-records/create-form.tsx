'use client';

import { useActionState } from 'react';
import { MilkTeaField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMilkTeaRecords, MilkTeaRecordsState } from '@/app/lib/actions';

export default function Form({ milkTeas }: { milkTeas: MilkTeaField[] }) {

  const initialState: MilkTeaRecordsState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createMilkTeaRecords, initialState);

  return (
    <form action={formAction}  aria-describedby="form-error">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* MilkTea Name */}
        <div className="mb-4">
          <label htmlFor="milkTea" className="mb-2 block text-sm font-medium">
            选择奶茶
          </label>
          <div className="relative">
            <select
              id="milktea"
              name="milkTeaId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="milkTea-error"
            >
              <option value="" disabled>
                请选择
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
                placeholder="请输入金额"
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
        <Button type="submit">确定</Button>
      </div>
    </form>
  );
}
