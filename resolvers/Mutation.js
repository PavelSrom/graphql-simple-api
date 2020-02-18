const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const getUserId = require('../utils/getUserId')

const Mutation = {
  createUser: async (parent, { data: { name, email, password } }, { prisma }) => {
    const userExists = await prisma.user({ email })
    if (userExists) throw new Error('User with this email already exists')

    password = await bcrypt.hash(password, 8)

    const user = await prisma.createUser({ name, email, password })

    const token = jwt.sign({ id: user.id }, 'pavelskisecret')

    return { user, token }
  },
  loginUser: async (parent, { email, password }, { prisma }) => {
    const user = await prisma.user({ email })
    if (!user) throw new Error('Invalid email')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Invalid password')

    const token = jwt.sign({ id: user.id }, 'pavelskisecret')

    return { user, token }
  },
  updateUser: (parent, { name }, { prisma, request }) => {
    const userID = getUserId(request)

    return prisma.updateUser({ where: { id: userID }, data: { name } })
  },
  deleteUser: async (parent, args, { prisma, request }) => {
    const userID = getUserId(request)

    const exists = await prisma.user({ id: userID })
    if (!exists) throw new Error('No such user exists')

    return prisma.deleteUser({ id: userID })
  },
  createPost: (parent, { data: { title, body } }, { prisma, request }) => {
    const userID = getUserId(request)

    return prisma.createPost({
      title,
      body,
      author: { connect: { id: userID } }
    })
  },
  deletePost: async (parent, { id }, { prisma, request }) => {
    const userID = getUserId(request)

    const post = await prisma.post({ id }) // why can't I do 'connect' here
    if (!post) throw new Error('Post not found')

    const author = await prisma.post({ id }).author()
    if (author.id !== userID) throw new Error("Can't delete other people's posts")

    return prisma.deletePost({ id })
  },
  createComment: (parent, { post, text }, { prisma, request }) => {
    const userID = getUserId(request)

    return prisma.createComment({
      text,
      post: { connect: { id: post } },
      author: { connect: { id: userID } }
    })
  },
  deleteComment: async (parent, { id }, { prisma, request }) => {
    const userID = getUserId(request)

    const comment = await prisma.comment({ id }) // why can't I do 'connect' here
    if (!comment) throw new Error('Comment not found')

    const author = await prisma.comment({ id }).author()
    if (author.id !== userID) throw new Error("Can't delete other people's posts")

    return prisma.deleteComment({ id })
  }
}

module.exports = Mutation