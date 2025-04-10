# 奶茶日记

这里记录的是奶茶, 亦是生活中的那些甜蜜与美好.


## 介绍

学习 Next.js, 根据官方教程 [https://nextjs.org/learn/dashboard-app](https://nextjs.org/learn/dashboard-app) 完成了教程里的官方项目

项目：[https://github.com/vercel/next-learn](https://github.com/vercel/next-learn)

然后在原官方项目的基础上进行改造

改造成当前的**奶茶日记**

![截图](/public/pc.png)


## 功能

**当前已实现的功能**

- [x] 用户注册/登录
- [x] 首页总览/最近记录
- [x] 记录的增删改查
- [x] 奶茶数据汇总

**未实现的功能**

- [ ] 根据用户区分记录数据
- [ ] 首页数据表


## 体验

用户名：`user@nextmail.com`

密码：`123456`

线上体验地址：[https://milk-tea-diary.vercel.app/](https://milk-tea-diary.vercel.app/)

## 运行

**1. 克隆项目**

```bash
git clone https://github.com/imshadow/Milk-Tea-Diary.git
```

**2. 安装 `pnpm` 包管理器**

```bash
npm install -g pnpm
```

**3. 安装依赖**

```bash
cd Milk-Tea-Diary
```

```bash
pnpm i
```

**4. 创建 .env 文件**

文件内容如下：

```
# Parameters for Vercel Postgres Templates
POSTGRES_URL=postgres://***:***@***/***
POSTGRES_URL_NON_POOLING=postgres://***:***@***/***
POSTGRES_USER=***
POSTGRES_HOST=***
POSTGRES_PASSWORD=***
POSTGRES_DATABASE=***
POSTGRES_URL_NO_SSL=postgres://***:***@***/***
POSTGRES_PRISMA_URL=postgres://***:***@***/***

# `openssl rand -base64 32`
AUTH_SECRET=d4e13dcd3c5215aeccbf5f6960857699
AUTH_URL=http://localhost:3000/api/auth
```

上面部分是数据库配置，请参考：[https://nextjs.org/learn/dashboard-app/setting-up-your-database](https://nextjs.org/learn/dashboard-app/setting-up-your-database)

下面部分是登录相关配置，可以不修改，其中 `AUTH_SECRET` 访问 [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) 即可获得

**5. 运行**

```bash
pnpm dev
```

**6. 初始化数据库**

首次运行需要初始化数据库

直接访问 [http://localhost:3000/seed](http://localhost:3000/seed) 来初始化
