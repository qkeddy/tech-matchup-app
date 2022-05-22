// Import GraphQL from the Apollo client
import { gql } from "@apollo/client";

// Query Tech 
export const QUERY_TECH = gql`
    query tech {
        tech {
            _id
            name
        }
    }
`;

// Query matchups. Note that `_id` is not required (on String)
export const QUERY_MATCHUPS = gql`
    query matchups($_id: String) {
        matchups(_id: $_id) {
            _id
            tech1
            tech2
            tech1_votes
            tech2_votes
        }
    }
`;
