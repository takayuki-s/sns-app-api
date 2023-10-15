const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const isAuthenticated = require('../middlewares/isAuthenticated')
const prisma = new PrismaClient()

// 呟き投稿用API
router.post('/post', isAuthenticated, async (req, res) => {
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ message: '投稿内容がありません' })
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
      include: {
        author: true,
      },
    })
    return res.status(200).json(newPost)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'サーバーエラーです' })
  }
})

// 最新呟き投稿用API
// TODO: 後ほど作成
router.get('/get_latest_post', async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
      },
    })
    return res.json(latestPosts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'サーバーエラーです' })
  }
})
module.exports = router
