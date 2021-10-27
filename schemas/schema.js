import graphql from 'graphql'

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
  { _id: "u1", name: "Losrobbos" },
  { _id: "u2", name: "Wazzabizz" }
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
    todos: {
      type: new GraphQLList( TodoType ),
      resolve: (user) => {
        return todos.filter(todo => todo.userId == user._id )
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: (parent, args) => {
        return users
      }
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (parent, args) => {
        return todos
      }
    }

  }
})

// create schema with RootQuery & RootMutations
const schema = new GraphQLSchema({
  query: RootQuery
})

export default schema