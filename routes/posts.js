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
  const {name, description} = req.body;
  const newPost = await prisma.post.create({
    data: {
      name,
      description
    }
  });
  res.json(newPost);
});

/* DELETE post by id. */
router.delete('/:id', async function (req, res, next) {
  const post = await prisma.post.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  if (post) {
    res.json(post);
  } else {
    res.json({
      message: 'Post not found'
    });
  }

});

module.exports = router;
