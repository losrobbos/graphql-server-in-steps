import { GraphQLObjectType, GraphQLString } from "graphql"
import UserType from './UserType.js'

const AuthType = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

export default AuthType