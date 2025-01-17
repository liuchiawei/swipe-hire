import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@swipehire.com" },
    update: {},
    create: {
      email: "admin@swipehire.com",
      password: "hashed_password",　
    },
  });

  console.log(`管理者ユーザーが作成されました: ${admin.email}`);

  // Company Profile
  const jobs = [
    {
      company: "Google",
      industry: "Tech",
      location: "東京",
      position: "ウエブデザイナー",
      salary: 8000000,
      description: "Googleのウエブデザイナーの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.google.com",
    },
    {
      company: "Amazon",
      industry: "Tech",
      location: "大阪",
      position: "エンジニア",
      salary: 7000000,
      description: "Amazonのエンジニアの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.amazon.com",
    },
    {
      company: "Facebook",
      industry: "Tech",
      location: "福岡",
      position: "UI/UX デザイナー",
      salary: 7500000,
      description: "FacebookのUI/UX デザイナーの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.facebook.com",
    },
    {
      company: "Apple",
      industry: "Tech",
      location: "名古屋",
      position: "プロダクトマネージャー",
      salary: 9000000,
      description: "Appleのプロダクトマネージャーの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.apple.com",
    },
    {
      company: "Tesla",
      industry: "Tech",
      location: "東京",
      position: "データサイエンティスト",
      salary: 10000000,
      description: "Teslaのデータサイエンティストの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.tesla.com",
    },
    {
      company: "Sony",
      industry: "Tech",
      location: "東京",
      position: "データサイエンティスト",
      salary: 10000000,
      description: "Sonyのデータサイエンティストの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.sony.com",
    },
    {
      company: "Microsoft",
      industry: "Tech",
      location: "東京",
      position: "データサイエンティスト",
      salary: 10000000,
      description: "Microsoftのデータサイエンティストの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.microsoft.com",
    },
  ];

  for (const job of jobs) {
    await prisma.jobs.create({
      data: {
        ...job,
      }
    });
  }

  console.log("7会社が作成されました！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
