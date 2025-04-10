'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import {authenticate, createUser, State, UserState} from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

export default function RegisterForm() {

  const initialState: UserState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);

  return (
      <form action={formAction} className="space-y-3" aria-describedby="form-error">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            注册新账号.
          </h1>
          <h6 className="text-xs text-pink-500">注册成功后将自动登录系统.</h6>
          <div className="w-full">
            <div>
              <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
              >
                邮箱
              </label>
              <div className="relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="请输入邮箱"
                    aria-describedby="email-error"
                />
                <AtSymbolIcon
                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-pink-500 peer-focus:text-pink-900"/>
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                    state.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                    ))}
              </div>
            </div>
            <div className="mt-4">
              <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
              >
                密码
              </label>
              <div className="relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    aria-describedby="email-error"
                    minLength={6}
                />
                <KeyIcon
                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-pink-500 peer-focus:text-pink-900"/>
              </div>
              <div id="password-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                    state.errors.password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                    ))}
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full">
            注册 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
          </Button>
          <div id="form-error" aria-live="polite" aria-atomic="true">
            {
                state.errors &&
                <p className="mt-2 text-sm text-red-500 font-semibold">
                  {state.message}
                </p>
            }
          </div>
          <p className={`${lusitana.className} text-sm py-6 text-gray-800 md:text-sm md:leading-normal`}>
            <a href="/login" className="text-balck-500">
              已经账号？立即登录
            </a>
          </p>
        </div>
      </form>
  );
}
