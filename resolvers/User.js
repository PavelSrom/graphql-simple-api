const User = {
  posts: (parent, args, { prisma }, info) => {
    return prisma.user({ id: parent.id }).posts()
  },
  comments: (parent, args, { prisma }, info) => {
    return prisma.user({ id: parent.id }).comments()
  }
}

module.exports = User