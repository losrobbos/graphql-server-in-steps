import mongoose from 'mongoose'

const MONGO_URI = "mongodb://localhost/todos_graphql_db?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))