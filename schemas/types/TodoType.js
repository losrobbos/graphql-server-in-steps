import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean} from 'graphql'
import UserType from './UserType.js'
import User from '../../models/User.js'

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    _id: { type: GraphQLID },
    text: { type: GraphQLString},
    status: { type: GraphQLBoolean },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve: (todo, args) => {
        return User.findById( todo.userId )
      }
    }
  })
})

export default TodoType