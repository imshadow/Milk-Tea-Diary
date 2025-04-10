import bcrypt from 'bcrypt';
import {db} from '@vercel/postgres';
import { milkTeaRecords, milkTeas, revenue, users} from '../lib/placeholder-data';

const client = await db.connect();

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS t_users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  return await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO t_users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
  );
}

async function seedMilkTeas() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS t_milk_teas (
      id INT NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  return await Promise.all(
      milkTeas.map(
          (milktea) => client.sql`
        INSERT INTO t_milk_teas (id, name, image_url)
        VALUES (${milktea.id}, ${milktea.name}, ${milktea.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
  );
}

async function seedMilkTeaRecords() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS t_milk_tea_records (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      milk_tea_id INT NOT NULL,
      amount INT NOT NULL,
      date DATE NOT NULL
    );
  `;

  return await Promise.all(
      milkTeaRecords.map(
          (milkteaRecord) => client.sql`
        INSERT INTO t_milk_tea_records (user_id, milk_tea_id, amount, date)
        VALUES (${milkteaRecord.user_id}, ${milkteaRecord.milk_tea_id}, ${milkteaRecord.amount}, ${milkteaRecord.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
  );
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedMilkTeas();
    await seedMilkTeaRecords();
    await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
