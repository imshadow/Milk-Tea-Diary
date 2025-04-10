'use server';

import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {auth, signIn} from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";

//奶茶记录
const MilkTeaRecordsFormSchema = z.object({
  id: z.string(),
  milkTeaId: z.string({
    invalid_type_error: '请选择奶茶.',
  }),
  amount: z.coerce
      .number()
      .gt(0, { message: '请输入大于¥0的金额.' }),
  date: z.string(),
});

export type MilkTeaRecordsState = {
  errors?: {
    milkTeaId?: string[];
    amount?: string[];
  };
  message?: string | null;
};

const CreateMilkTeaRecords = MilkTeaRecordsFormSchema.omit({ id: true, date: true });

export async function createMilkTeaRecords(prevState: MilkTeaRecordsState, formData: FormData) {

  const validatedFields = CreateMilkTeaRecords.safeParse({
    milkTeaId: formData.get('milkTeaId'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '请完整填写表单.',
    };
  }

  // Prepare data for insertion into the database
  const { milkTeaId, amount} = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  const session = await auth();
  const userId = session?.user?.id;

  try {
    await sql`
      INSERT INTO t_milk_tea_records (user_id, milk_tea_id, amount, date)
      VALUES (${userId}, ${milkTeaId}, ${amountInCents}, ${date})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath('/dashboard/milk-tea-records');
  redirect('/dashboard/milk-tea-records');
}

// Use Zod to update the expected types
const UpdateMilkTeaRecords = MilkTeaRecordsFormSchema.omit({ id: true, date: true });

// ...

export async function updateMilkTeaRecords(
    id: string,
    prevState: MilkTeaRecordsState,
    formData: FormData,
) {

  const validatedFields = UpdateMilkTeaRecords.safeParse({
    milkTeaId: formData.get('milkTeaId'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '请完整填写表单.',
    };
  }

  const { milkTeaId, amount} = validatedFields.data;
  const amountInCents = (amount * 100).toFixed(0);

  try {
    await sql`
        UPDATE t_milk_tea_records
        SET milk_tea_id = ${milkTeaId}, amount = ${amountInCents}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath('/dashboard/milk-tea-records');
  redirect('/dashboard/milk-tea-records');
}

export async function deleteMilkTeaRecords(id: string) {
  // throw new Error('Failed to Delete MilkTeaRecords');

  await sql`DELETE FROM t_milk_tea_records WHERE id = ${id}`;
  revalidatePath('/dashboard/milk-tea-records');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

//创建用户相关
const UserFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nonempty({
    message: '请输入邮箱.',
  }),
  password: z.string().nonempty({
    message: '请输入密码.',
  }).min(6, {
    message: '密码长度不得少于6位'
  }),
});

export type UserState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const CreateUser = UserFormSchema.omit({ id: true, name: true });

export async function createUser(prevState: UserState, formData: FormData) {

  const validatedFields = CreateUser.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    // console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '请先将邮箱和密码填写完整.',
    };
  }

  // Prepare data for insertion into the database
  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const name = "用户" + Date.now().toString();

  const result = await sql`SELECT COUNT(0) FROM t_users WHERE email=${email}`;
  if(parseInt(result.rows[0].count) > 0) {
    return {
      errors: {
        email: ['邮箱已被使用.'],
      },
      message: null,
    };
  }

  try {
    await sql`
      INSERT INTO t_users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  await authenticate(undefined, formData);

}
