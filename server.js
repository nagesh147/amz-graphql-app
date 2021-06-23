var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');
var fs = require('fs')
var { GraphQLJSON } = require('graphql-type-json');
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  scalar JSON
  type Query {
    claimsData: JSON
  } 
`);
 
// The root provides a resolver function for each API endpoint
var data = fs.readFileSync('data.json', 'utf8')
var root = {
  JSON: GraphQLJSON,
  claimsData: () => {
    return JSON.parse(data);
  },
};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.use(cors());
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');