const express = require ('express');
const bodyParser = require ('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const {buildSchema} = require('graphql');
const mongoose = require('mongoose');

const app = express();

app.use (bodyParser.json());



const events = [];

//queries and mutation
app.use('/graphql', graphqlHttp({
    //return a list of strings
    schema: buildSchema(`
    type Event{
        _id : ID!
        title : String
        description: String
        price: Float
        date: String
    }

    input EventInput {
        title : String
        description: String
        price: Float
        date: String
    }


    type RootQuery{
        events: [Event!]!
    }
    type RootMutation {
        createEvent(eventInput: EventInput): Event

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue:{
        events: () => {
            return events
        },
        createEvent: (args) =>{
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date

            };
            events.push (event);
            return event;

        },
    },
    graphiql : true
}))
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g6hli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
).then(()=>{
    app.listen(3000);
    console.log('connected');
}).catch(err=>{
    console.log(err);
})
