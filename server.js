import express from 'express'
import { graphqlHTTP } from "express-graphql";
import schema from './schemas/schema.js'
import auth from './auth/authenticate.js'
import './env-setup.js'

const app = express()

// Authentication / token validation
app.use( auth )

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

