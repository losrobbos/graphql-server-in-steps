import graphql, { GraphQLInputObjectType } from 'graphql'
import jwt from 'jsonwebtoken'

const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLList, 
  GraphQLID, 
  GraphQLInt, 
  GraphQLBoolean, 
  GraphQLString
} = graphql

const users = [ 
  { _id: "u1", name: "Losrobbos", email: "los@los.los", pw: "los" },
  { _id: "u2", name: "Wazzabizz", email: "waz@waz.waz", pw: "waz" }
]

const todos = [
  { _id: "t1", text: "Code GraphQL intro", status: false, userId: "u1" },
  { _id: "t2", text: "Deploy GraphQL to Vercellll", status: false, userId: "u1" },
  { _id: "t3", text: "Code Mini Todo Frontend", status: false, userId: "u1" },
  { _id: "t4", text: "Leaving for good", status: true, userId: "u2" },
]

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
        return users.find(user => user._id == todo.userId)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    todos: {
      type: new GraphQLList( TodoType ),
      resolve: (user) => {
        return todos.filter(todo => todo.userId == user._id )
      }
    }
  })
})

const AuthType = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

const UserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: GraphQLString }
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

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    login: {
      type: AuthType,
      args: { 
        email: { type: GraphQLString },
        pw: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const { email, pw } = args
        const userFound = users.find(user => user.email == email && user.pw == pw )

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
        return users.find(user => user._id == args.id)
      }
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID }},
      resolve: () => {
        return todos.find(todo => todo._id == args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, args, { isAuth, user }) => {
        console.log(isAuth, user)
        if(!isAuth) {
          throw new Error("Not allowed to view users without token, buddy")
        }
        return users
      }
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (_, args, { isAuth }) => {
        console.log( isAuth )
        return todos
      }
    }

  }
})

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    userAdd: {
      type: UserType,
      args: { input: { type: UserInput }},
      resolve: (_, args) => {
        const userNew = { ...args.input, _id: Date.now().toString() }
        users.push( userNew )
        return userNew
      }
    },
    todoAdd: {
      type: TodoType,
      args: { input: { type: TodoInput }},
      resolve: (_, args) => {
        const todoNew = { ...args.input, _id: Date.now().toString() }
        todos.push( todoNew )
        return todoNew
      }
    }
  })
})

// create schema with RootQuery & RootMutations
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

export default schema