const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./prisma/generated/prisma-client')
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => ({
    request,
    prisma
  })
})

server.start(() => console.log('Server running...'))