const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

<<<<<<< HEAD
const Event = require('./models/listings')

const app = express();

app.use (bodyParser.json());


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
            Event.find().then(events =>{
                return events.map(event =>
                   { return { ...event._doc, _id:event._doc._id.toString()}
                });

            }).catch (err =>{
                throw err;
            })
        
        },
        createEvent: (args) =>{
            const event = new Event({
                title: args.eventInput.title,
                 description: args.eventInput.description,
                 price: +args.eventInput.price,
                 date: new Date(args.eventInput.date)
                
            });
           return event.save().then(result =>{
                console.log(result);
                return {...result._doc, _id:event._doc._id.toString()};
            }).catch(err =>{
                console.log(err);
                throw err;
            })
            
        },
    },
    graphiql : true
}))
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g6hli.mongodb.net/${process.env.MONDO_DB}?retryWrites=true&w=majority`
).then(()=>{
=======
const graphQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index');
const auth = require('./utils/auth');

const app = express();

app.use(bodyParser.json());

app.use(auth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
>>>>>>> 77d24046a54c3bdd13a1847c119a997c8f29bef0
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });