import { places } from "./places";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let place of places) {
    await prisma.place.create({
      data: place
    });
  }
}

main().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => {
  prisma.$disconnect();
})



