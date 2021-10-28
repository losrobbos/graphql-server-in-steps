import graphql from 'graphql'
import RootQuery from './types/RootQuery.js'
import RootMutation from './types/RootMutation.js'

const { GraphQLSchema } = graphql

// create schema with RootQuery & RootMutations
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

export default schema