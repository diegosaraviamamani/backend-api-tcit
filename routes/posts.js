const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/* GET posts listing. */
router.get('/', async function (req, res, next) {
  const allPosts = await prisma.post.findMany();
  res.json(allPosts);
});

/* POST posts listing. */
router.post('/', async function (req, res, next) {
  try {
    const {name, description} = req.body;
    const newPost = await prisma.post.create({
      data: {
        name,
        description
      }
    });
    res.json(newPost);
  } catch (error) {
    next(error);
  }
});

/* DELETE post by id. */
router.delete('/:id', async function (req, res, next) {
  try {
    const {id} = req.params;
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(req.params.id)
      }
    });
    res.json(deletedPost);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
