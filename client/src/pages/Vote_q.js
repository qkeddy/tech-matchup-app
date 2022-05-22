// import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import { getMatchup, createVote } from "../utils/api";

// Import Apollo hooks
import { useMutation, useQuery } from "@apollo/client";

// Import queries
import { CREATE_VOTE } from "../utils/mutations"; 
import { QUERY_MATCHUPS } from "../utils/queries";


const Vote = () => {
    // const [matchup, setMatchup] = useState({});
    let { id } = useParams();

    const { loading, data } = useQuery(QUERY_MATCHUPS,
        {
            // If an id comes down th pipeline, it will be supplied, but not required
            variables: { _id: id }
        }
    )

    // Waiting for matchups to come back
    const matchup = data?.matchups || [];

    // useEffect(() => {
    //     const getMatchupInfo = async () => {
    //         try {
    //             const res = await getMatchup(id);
    //             if (!res.ok) {
    //                 throw new Error("No matchup");
    //             }
    //             const matchup = await res.json();
    //             setMatchup(matchup);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     getMatchupInfo();
    // }, [id]);

    const handleVote = async (techNum) => {
        try {
            // const res = await createVote({ id, techNum });
            await createVote({
                variables: { _id: id, techNum }
            });

            // if (!res.ok) {
            //     throw new Error("Could not vote");
            // }

            // const matchup = await res.json();
            // console.log(matchup);
            // setMatchup(matchup);
        } catch (err) {
            console.error(err);
        }
    };

    const [createVote, { error }] = useMutation(CREATE_VOTE);

    return (
        <div className="card bg-white card-rounded w-50">
            <div className="card-header bg-dark text-center">
                <h1>Here is the matchup!</h1>
            </div>
            {/* Add Ternary */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="card-body text-center mt-3">
                    <h2>
                        {matchup.tech1} vs. {matchup.tech2}
                    </h2>
                    <h3>
                        {matchup.tech1_votes} : {matchup.tech2_votes}
                    </h3>
                    <button className="btn btn-info" onClick={() => handleVote(1)}>
                        Vote for {matchup.tech1}
                    </button>{" "}
                    <button className="btn btn-info" onClick={() => handleVote(2)}>
                        Vote for {matchup.tech2}
                    </button>
                    <div className="card-footer text-center m-3">
                        <br></br>
                        <Link to="/">
                            <button className="btn btn-lg btn-danger">View all matchups</button>
                        </Link>
                    </div>
                </div>
            )}
            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default Vote;
