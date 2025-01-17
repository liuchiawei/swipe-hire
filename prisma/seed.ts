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
  const companies = [
    {
      name: "Google",
      industry: "Tech",
      location: "東京",
      position: "ウエブデザイナー",
      salary: 8000000,
      description: "Googleのウエブデザイナーの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.google.com",
    },
    {
      name: "Amazon",
      industry: "Tech",
      location: "大阪",
      position: "エンジニア",
      salary: 7000000,
      description: "Amazonのエンジニアの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.amazon.com",
    },
    {
      name: "Facebook",
      industry: "Tech",
      location: "福岡",
      position: "UI/UX デザイナー",
      salary: 7500000,
      description: "FacebookのUI/UX デザイナーの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.facebook.com",
    },
    {
      name: "Apple",
      industry: "Tech",
      location: "名古屋",
      position: "プロダクトマネージャー",
      salary: 9000000,
      description: "Appleのプロダクトマネージャーの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.apple.com",
    },
    {
      name: "Tesla",
      industry: "Tech",
      location: "東京",
      position: "データサイエンティスト",
      salary: 10000000,
      description: "Teslaのデータサイエンティストの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.tesla.com",
    },
    {
      name: "Sony",
      industry: "Tech",
      location: "東京",
      position: "データサイエンティスト",
      salary: 10000000,
      description: "Sonyのデータサイエンティストの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.sony.com",
    },
    {
      name: "Microsoft",
      industry: "Tech",
      location: "東京",
      position: "データサイエンティスト",
      salary: 10000000,
      description: "Microsoftのデータサイエンティストの求人です。",
      requirement: ["HTML", "CSS", "JavaScript"],
      url: "https://www.microsoft.com",
    },
  ];

  for (const company of companies) {
    await prisma.company.create({
      data: {
        ...company,
        requirement: [],
      },
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
