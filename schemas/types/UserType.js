import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} from 'graphql'
import TodoType from './TodoType.js'
import Todo from '../../models/Todo.js'

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    todos: {
      type: new GraphQLList( TodoType ),
      resolve: (user) => {
        return Todo.find({ userId: user._id })
      }
    }
  })
})

export default UserType