// Import GraphQL from the Apollo client
import { gql } from "@apollo/client";

// Create  matchup
export const CREATE_MATCHUP = gql`
    mutation createMatchup($tech1: String!, $tech2: String!) {
        createMatchup(tech1: $tech1, tech2: $tech2) {
            _id
            tech1
            tech2
        }
    }
`;

// Create a vote. Note that `techNum` is an integer that will be passed into a template literal
export const CREATE_VOTE = gql`
    mutation createVote($_id: String!, $techNum: Int!) {
        createVote(_id: $_id, techNum: $techNum) {
            _id
            tech1
            tech2
            tech1_votes
            tech2_votes
        }
    }
`;
