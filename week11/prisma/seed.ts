import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // สร้าง user + order ตัวอย่าง 5 คน
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
      },
    });

    await prisma.order.create({
      data: {
        item: `Item ${i}`,
        quantity: i,
        userId: user.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });