import jwt from 'jsonwebtoken'

import { 
  GraphQLObjectType,
  GraphQLString, 
  GraphQLList,
  GraphQLID
} from 'graphql'

// import Graphql entity types
import TodoType from './TodoType.js'
import UserType from './UserType.js'
import AuthType from './AuthType.js'

import User from '../../models/User.js'
import Todo from '../../models/Todo.js'

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    login: {
      type: AuthType,
      args: { 
        email: { type: GraphQLString },
        pw: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { email, pw } = args
        // const userFound = users.find(user => user.email == email && user.pw == pw )
        const userFound = await User.findOne({ email, pw })

        if(!userFound) {
          throw new Error("User does not exist. Try harder, dear hacker")
        }

        const JWT_SECRET = process.env.JWT_SECRET
        const userData = { _id: userFound._id, name: userFound.name, email: userFound.email }
        const token = jwt.sign( userData, JWT_SECRET, { expiresIn: '15m'})

        return { user: userData, token }
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve: (_, args) => {
        return User.findById( args.id )
      }
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID }},
      resolve: (_, args) => {
        return Todo.findById( args.id )
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, args, { isAuth, authError, user }) => {
        if(!isAuth) throw new Error( authError )
        return User.find()
      }
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: async (_, args, { isAuth }) => {
        return Todo.find()
      }
    }

  }
})

export default RootQuery