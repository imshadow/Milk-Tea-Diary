// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

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

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: '用户4799',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: '用户6579',
    email: 'root@qq.com',
    password: '123456',
  },
];

const milkTeas = [
  {
    id: 1,
    name: '霸王茶姬',
    image_url: '/milk-teas/bwcj.png',
  },
  {
    id: 2,
    name: '茶百道',
    image_url: '/milk-teas/cbd.png',
  },
  {
    id: 3,
    name: 'CoCo都可',
    image_url: '/milk-teas/coco.png',
  },
  {
    id: 4,
    name: '茶颜悦色',
    image_url: '/milk-teas/cyys.png',
  },
  {
    id: 5,
    name: '古茗',
    image_url: '/milk-teas/gm.png',
  },
  {
    id: 6,
    name: '沪上阿姨',
    image_url: '/milk-teas/hsay.png',
  },
  {
    id: 7,
    name: '蜜雪冰城',
    image_url: '/milk-teas/mxbc.png',
  },
  {
    id: 8,
    name: '奈雪的茶',
    image_url: '/milk-teas/nxdc.png',
  },
  {
    id: 9,
    name: '书亦烧仙草',
    image_url: '/milk-teas/sysxc.png',
  },
  {
    id: 10,
    name: '喜茶',
    image_url: '/milk-teas/xc.png',
  },
  {
    id: 11,
    name: '一点点',
    image_url: '/milk-teas/ydd.png',
  },
  {
    id: 12,
    name: '益禾堂',
    image_url: '/milk-teas/yht.png',
  },
];

const milkTeaRecords = [
  {
    user_id: users[0].id,
    milk_tea_id: milkTeas[0].id,
    amount: 15795,
    date: '2022-12-06',
  },
  {
    user_id: users[1].id,
    milk_tea_id: milkTeas[11].id,
    amount: 20348,
    date: '2022-11-14',
  },
  {
    user_id: users[0].id,
    milk_tea_id: milkTeas[10].id,
    amount: 3040,
    date: '2022-10-29',
  },
  {
    user_id: users[1].id,
    milk_tea_id: milkTeas[9].id,
    amount: 44800,
    date: '2023-09-10',
  },
  {
    user_id: users[1].id,
    milk_tea_id: milkTeas[4].id,
    amount: 34577,
    date: '2023-08-05',
  },
  {
    user_id: users[0].id,
    milk_tea_id: milkTeas[4].id,
    amount: 54246,
    date: '2023-07-16',
  },
  {
    user_id: users[1].id,
    milk_tea_id: milkTeas[1].id,
    amount: 666,
    date: '2023-06-27',
  },
  {
    user_id: users[1].id,
    milk_tea_id: milkTeas[7].id,
    amount: 32545,
    date: '2023-06-09',
  },
  {
    user_id: users[0].id,
    milk_tea_id: milkTeas[6].id,
    amount: 1250,
    date: '2023-06-17',
  },
  {
    user_id: users[0].id,
    milk_tea_id: milkTeas[3].id,
    amount: 8546,
    date: '2023-06-07',
  },
  {
    user_id: users[1].id,
    milk_tea_id: milkTeas[9].id,
    amount: 500,
    date: '2023-08-19',
  },
  {
    user_id: users[0].id,
    milk_tea_id: milkTeas[8].id,
    amount: 8945,
    date: '2023-06-03',
  },
  {
    user_id: users[1].id,
    milk_tea_id: milkTeas[5].id,
    amount: 1000,
    date: '2022-06-05',
  },
];

export { users, revenue, milkTeas, milkTeaRecords };
