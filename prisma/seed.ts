import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const users: Prisma.userCreateManyInput[] = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
  ];

  await prisma.user.createMany({
    data: users,
  });

  // 添加更多初始数据
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
