import express from 'express'
import { graphqlHTTP } from "express-graphql";
import schema from './schemas/schema.js'

const app = express()

app.get("/", (req, res) => {
  res.json({ message: "Hello from GraphQL Todos API!" })
})

// HANDLE all request types to Graphql route by graphql middleware
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,  
}))

const PORT = 5000
app.listen(PORT, () => console.log("GraphQL Express API started up!"))

