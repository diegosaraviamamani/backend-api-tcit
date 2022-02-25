const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


(async function main() {
  try {
    const posts = await prisma.post.createMany({
      data: [
        {
          name: 'Post 1',
          description: 'Post 1 description',
        },
        {
          name: 'Post 2',
          description: 'Post 2 description',
        },
      ],
    });
    console.log(posts)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()