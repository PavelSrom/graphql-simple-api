const Post = {
  author: (parent, args, { prisma }) => {
    return prisma.post({ id: parent.id }).author()
  },
  comments: (parent, args, { prisma }) => {
    return prisma.post({ id: parent.id }).comments()
  }
}

module.exports = Post