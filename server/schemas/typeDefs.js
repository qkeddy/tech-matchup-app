const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Matchup {
        _id: ID!
        tech1: String!
        tech2: String!
        tech1_votes: Int
        tech2_votes: Int
    }

    # Require both ID and name for any type of Tech
    type Tech {
        _id: ID!
        name: String!
    }

    type Query {
        # Returns an array of tech objects
        tech: [Tech]
        # Finds both a single (with ID) and an array of match-ups
        # Find one or find many
        matchups(_id: String): [Matchup]
        # Alternative approach
        # matchup(_id: String): Matchup
        # matchups: [Matchup]
    }

    type Mutation {
        createMatchup(tech1: String!, tech2: String!): Matchup

        # TODO Question - How is the code being structured?
        # 1) Reference the match-up ID
        # 2) which tech are we on and dynamically passing in if you are tech1 or tech2 as an argument on the URI.
        createVote(_id: String!, techNum: Int!): Matchup
    }
`;

module.exports = typeDefs;
