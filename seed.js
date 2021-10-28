import mongoose from 'mongoose'
import User from "./models/User.js"
import Todo from "./models/Todo.js"
import './db-connect.js'

// Seed in some data
const seed = async () => {
  
  await Todo.deleteMany()
  await User.deleteMany()

  try {
    
    const users = [ 
      { name: "Losrobbos", email: "los@los.los", pw: "los" },
      { name: "Wazzabizz", email: "waz@waz.waz", pw: "waz" }
    ]
  
    const usersDb = await User.insertMany(users)

    const todos = [
      { text: "Code GraphQL intro", status: false, userId: usersDb[0] },
      { text: "Deploy GraphQL to Vercellll", status: false, userId: usersDb[0] },
      { text: "Code Mini Todo Frontend", status: false, userId: usersDb[0] },
      { text: "Leaving for good", status: true, userId: usersDb[1] },
    ]
  
    const todosDb = await Todo.insertMany(todos)
    console.log(`Seeded ${usersDb.length} users & ${todosDb.length} todos`)
  }
  catch(err) {
    console.log(err.message)
  }

  mongoose.connection.close()
}

seed()