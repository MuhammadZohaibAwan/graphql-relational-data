const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema')

const app = express();

// express-graphql helps express to understand graphql
// we have one superCharged end point where we are getting the data

mongoose.connect('mongodb://localhost:27017/graph-db')
    .then(() => console.log('Database connetion successful'));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

// express dosen't understand this middleware so it will hand it over to graphqlHttp 
// whenever this route got hit 


app.listen(4000, () => {
    console.log('listening on port 4000');
})