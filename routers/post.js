const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

// 呟き投稿用API
router.post('/post', async (req, res) => {
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ message: '投稿内容がありません' })
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1, // TODO: 後ほど修正
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
// router.post('/', async (req, res) => {})

module.exports = router
