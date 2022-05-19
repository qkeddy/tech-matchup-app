const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Matchup {
    _id: ID
    tech1: String!
    tech2: String!
    tech1_votes: Number
    tech2_votes: Number
}

type Tech {
    _id: ID
    name: String!
}

type Query {
    getAllTech: [Tech]
    getAllMatchups: [Matchup]
    getMatchup(matchupId: ID!): Matchup 
}

type Mutation {
    createMatchup()
    createVote(matchupId: ID!, techId: ID! ): Matchup
}

`;

module.exports = typeDefs;
