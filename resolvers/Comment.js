const Comment = {
  author: (parent, args, { prisma }) => {
    return prisma.comment({ id: parent.id }).author()
  },
  post: (parent, args, { prisma }) => {
    return prisma.comment({ id: parent.id }).post()
  }
}

module.exports = Comment