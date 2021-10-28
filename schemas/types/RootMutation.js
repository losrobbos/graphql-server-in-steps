import { 
  GraphQLObjectType, 
  GraphQLInputObjectType, 
  GraphQLString, 
  GraphQLBoolean,
  GraphQLID
} from 'graphql'

import UserType from './UserType.js'
import TodoType from './TodoType.js'

import User from '../../models/User.js'
import Todo from '../../models/Todo.js'


const UserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    pw: { type: GraphQLString }
  }
})

const TodoInput = new GraphQLInputObjectType({
  name: "TodoInput",
  fields: {
    text: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    userId: { type: GraphQLID }
  }
})


const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    userAdd: {
      type: UserType,
      args: { input: { type: UserInput }},
      resolve: (_, args) => {
        return User.create( args.input )
      }
    },
    todoAdd: {
      type: TodoType,
      args: { input: { type: TodoInput }},
      resolve: (_, args) => {
        return Todo.create( args.input )
      }
    }
  })
})

export default RootMutation