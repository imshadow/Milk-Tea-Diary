import {sql} from '@vercel/postgres';
import {
  LatestMilkTeaRecordsRaw,
  MilkTeaField,
  MilkTeaRecordForm,
  MilkTeaRecordsTable,
  MilkTeasTableType,
  Revenue,
} from './definitions';
import {formatCurrency} from './utils';
import {auth} from "@/auth";

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT TO_CHAR(date, 'Mon') AS month, 
       SUM(amount) AS revenue
FROM t_milk_tea_records
WHERE date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date), TO_CHAR(date, 'Mon')
ORDER BY EXTRACT(YEAR FROM date) DESC, EXTRACT(MONTH FROM date) DESC;
`;

    // console.log('Data fetch completed after 3 seconds.');
    const revenue = [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
      { month: 'Apr', revenue: 2500 },
      { month: 'May', revenue: 2300 },
      { month: 'Jun', revenue: 3200 },
      { month: 'Jul', revenue: 3500 },
      { month: 'Aug', revenue: 3700 },
      { month: 'Sep', revenue: 2500 },
      { month: 'Oct', revenue: 2800 },
      { month: 'Nov', revenue: 3000 },
      { month: 'Dec', revenue: 4800 },
    ];

    console.log(data.rows);
    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestMilkTeaRecords() {

  try {
    const data = await sql<LatestMilkTeaRecordsRaw>`
       SELECT
        t_milk_tea_records.id,
        t_milk_tea_records.amount,
        t_milk_tea_records.date,
        t_milk_teas.name,
        t_milk_teas.image_url
      FROM t_milk_tea_records
      JOIN t_milk_teas ON t_milk_tea_records.milk_tea_id = t_milk_teas.id
      ORDER BY t_milk_tea_records.date DESC
      LIMIT 5`;

    // console.log(data);

    return data.rows.map((records) => ({
      ...records,
      amount: formatCurrency(records.amount),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest records.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const session = await auth();
    const userId = session?.user?.id;
    const totalAmountPromise = sql`SELECT SUM(amount) AS "amount" FROM t_milk_tea_records WHERE user_id = ${userId}`;
    const totalAmount7DaysPromise = sql`SELECT SUM(amount) AS "amount" FROM t_milk_tea_records WHERE user_id = ${userId} AND date >= CURRENT_DATE - INTERVAL '7 days'`;
    const totalCountPromise = sql`SELECT COUNT(0) AS "count" FROM t_milk_tea_records WHERE user_id = ${userId}`;
    const totalTypeCountPromise = sql`SELECT COUNT(DISTINCT milk_tea_id) AS "count" FROM t_milk_tea_records WHERE user_id = ${userId}`;

    const data = await Promise.all([
      totalAmountPromise,
      totalAmount7DaysPromise,
      totalCountPromise,
      totalTypeCountPromise,
    ]);

    const totalAmount = formatCurrency(data[0].rows[0].amount ?? '0');
    const totalAmount7Days = formatCurrency(data[1].rows[0].amount ?? '0');
    const totalCount = Number(data[2].rows[0].count ?? '0');
    const totalTypeCount = Number(data[3].rows[0].count ?? '0');

    return {
      totalAmount,
      totalAmount7Days,
      totalCount,
      totalTypeCount,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredMilkTeaRecords(
    query: string,
    currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const milkTeaRecords = await sql<MilkTeaRecordsTable>`
      SELECT
        t_milk_tea_records.id,
        t_milk_tea_records.amount,
        t_milk_tea_records.date,
        t_milk_teas.name,
        t_milk_teas.image_url
      FROM t_milk_tea_records
      JOIN t_milk_teas ON t_milk_tea_records.milk_tea_id = t_milk_teas.id
      WHERE
        t_milk_teas.name ILIKE ${`%${query}%`} OR
        t_milk_tea_records.amount::text ILIKE ${`%${query}%`} OR
        t_milk_tea_records.date::text ILIKE ${`%${query}%`}
      ORDER BY t_milk_tea_records.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return milkTeaRecords.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch MilkTeaRecords.');
  }
}

export async function fetchMilkTeaRecordsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM t_milk_tea_records
    JOIN t_milk_teas ON t_milk_tea_records.milk_tea_id = t_milk_teas.id
    WHERE
      t_milk_teas.name ILIKE ${`%${query}%`} OR
      t_milk_tea_records.amount::text ILIKE ${`%${query}%`} OR
      t_milk_tea_records.date::text ILIKE ${`%${query}%`}
  `;

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of MilkTeaRecords.');
  }
}

export async function fetchMilkTeaRecordById(id: string) {
  try {
    const data = await sql<MilkTeaRecordForm>`
      SELECT
        t_milk_tea_records.id,
        t_milk_tea_records.milk_tea_id,
        t_milk_tea_records.amount
      FROM t_milk_tea_records
      WHERE t_milk_tea_records.id = ${id};
    `;

    const milkTeaRecord = data.rows.map((milkTeaRecord) => ({
      ...milkTeaRecord,
      // Convert amount from cents to dollars
      amount: milkTeaRecord.amount / 100,
    }));

    return milkTeaRecord[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch MilkTeaRecord.');
  }
}

export async function fetchMilkTeas() {
  try {
    const data = await sql<MilkTeaField>`
      SELECT
        id,
        name
      FROM t_milk_teas
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all MilkTeas.');
  }
}

export async function fetchFilteredMilkTeas(query: string) {
  try {
    const data = await sql<MilkTeasTableType>`
		SELECT
		  t_milk_teas.id,
		  t_milk_teas.name,
		  t_milk_teas.image_url,
		  COUNT(t_milk_tea_records.id) AS total_count,
		  SUM(t_milk_tea_records.amount) AS total_amount
		FROM t_milk_teas
		LEFT JOIN t_milk_tea_records ON t_milk_teas.id = t_milk_tea_records.milk_tea_id
		WHERE
		  t_milk_teas.name ILIKE ${`%${query}%`}
		GROUP BY t_milk_teas.id, t_milk_teas.name, t_milk_teas.image_url
		ORDER BY t_milk_teas.name ASC
	  `;

    return data.rows.map((milkTea) => ({
      ...milkTea,
      total_amount: formatCurrency(milkTea.total_amount),
      average_amount: formatCurrency(milkTea.total_amount / milkTea.total_count),
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch MilkTeas table.');
  }
}