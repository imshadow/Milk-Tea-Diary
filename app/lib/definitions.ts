// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestMilkTeaRecords = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
  date: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestMilkTeaRecordsRaw = Omit<LatestMilkTeaRecords, 'amount'> & {
  amount: number;
};

//用户
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

//奶茶
export type MilkTea = {
  id: number;
  name: string;
  image_url: string;
};

//奶茶记录
export type MilkTeaRecord = {
  id: string;
  user_id: string;
  milk_tea_id: number;
  amount: number;
  date: string;
};

//最近奶茶记录
export type LatestMilkTeaRecord = {
  id: string;
  name: string;
  image_url: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestMilkTeaRecordRaw = Omit<LatestMilkTeaRecord, 'amount'> & {
  amount: number;
};

export type MilkTeaRecordsTable = {
  id: string;
  milk_tea_id: number;
  name: string;
  image_url: string;
  date: string;
  amount: number;
};

export type MilkTeasTableType = {
  id: number;
  name: string;
  image_url: string;
  total_count: number;
  total_amount: number;
};

export type FormattedMilkTeasTable = {
  id: number;
  name: string;
  image_url: string;
  total_count: number;
  total_amount: string;
  average_amount: string;
};

export type MilkTeaField = {
  id: number;
  name: string;
};

export type MilkTeaRecordForm = {
  id: string;
  user_id: string;
  milk_tea_id: number;
  amount: number;
};