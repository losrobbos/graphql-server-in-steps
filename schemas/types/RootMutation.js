import { 
  GraphQLObjectType, 
  GraphQLInputObjectType, 
  GraphQLString, 
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import UserType from './UserType.js'
import TodoType from './TodoType.js'

import User from '../../models/User.js'
import Todo from '../../models/Todo.js'


const UserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: new GraphQLNonNull( GraphQLString ) },
    email: { type: new GraphQLNonNull( GraphQLString ) },
    pw: { type: new GraphQLNonNull( GraphQLString ) }
  }
})

const TodoInput = new GraphQLInputObjectType({
  name: "TodoInput",
  fields: {
    text: { type: new GraphQLNonNull( GraphQLString ) },
    userId: { type: new GraphQLNonNull( GraphQLID ) },
    status: { type: GraphQLBoolean },
  }
})


const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    userAdd: {
      type: UserType,
      args: { input: { type: UserInput }},
      resolve: (_, args) => {
        console.log( args.input )
        return User.create( args.input )
      }
    },
    todoAdd: {
      type: TodoType,
      args: { input: { type: TodoInput }},
      resolve: (_, args) => {
        console.log( args.input )
        return Todo.create( args.input )
      }
    }
  })
})

export default RootMutation