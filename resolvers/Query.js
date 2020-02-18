const getUserId = require('../utils/getUserId')

const Query = {
  users: (parent, args, { prisma }) => {
    return prisma.users()
  },
  posts: (parent, args, { prisma }) => {
    return prisma.posts()
  },
  me: (parent, args, { prisma, request }) => {
    const userID = getUserId(request)

    return prisma.user({ id: userID })
  }
}

module.exports = Query