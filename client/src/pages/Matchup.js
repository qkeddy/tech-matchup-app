import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllTech, createMatchup } from "../utils/api";

// Import Apollo hooks
import { useMutation, useQuery } from "@apollo/client";

// Import queries
import { QUERY_TECH } from "../utils/queries";
import { CREATE_MATCHUP } from "../utils/mutations";

const Matchup = () => {
    // Populate the techList with a query
    const { loading, data } = useQuery(QUERY_TECH);

    // Display loading until there is data. Sets techList as an empty array until it is an array of objects
    const techList = data?.tech || [];

    // const [techList, setTechList] = useState([]);
    // Continue to use the state variable and default it to `JavaScript`
    const [formData, setFormData] = useState({
        tech1: "JavaScript",
        tech2: "JavaScript",
    });

    // Turn on navigator which is equivalent to a forced redirect without the user needing to click on anything
    let navigate = useNavigate();

    // Pass in `CREATE_MATCHUP` mutation function and return, error, loading and data
    const [createMatchup, { error }] = useMutation(CREATE_MATCHUP);

    // Update without mutation (the formData)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // const res = await createMatchup(formData);
            const { data } = await createMatchup({
                variables: { ...formData },
            });

            // if (!res.ok) {
            //     throw new Error("something went wrong!");
            // }

            // Use a template literal to dynamically create the URI and force a navigation
            navigate(`/matchup/${data.createMatchup._id}`)

            // const matchup = await res.json();
            // console.log(matchup);
            // navigate(`/matchup/${matchup._id}`);
        } catch (err) {
            console.error(err);
        }

        setFormData({
            // Set form data to the default
            tech1: "JavaScript",
            tech2: "JavaScript",
        });
    };

    return (
        <div className="card bg-white card-rounded w-25">
            <div className="card-header bg-dark text-center">
                <h1>Let's create a matchup!</h1>
            </div>
            <div className="card-body m-5">
                {/* Add ternary */}
                {loading ? (
                    <div>Loading....</div>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <label>Tech 1: </label>
                        <select name="tech1" onChange={handleInputChange}>
                            {techList.map((tech) => {
                                return (
                                    <option key={tech._id} value={tech.name}>
                                        {tech.name}
                                    </option>
                                );
                            })}
                        </select>
                        <label>Tech 2: </label>
                        <select name="tech2" onChange={handleInputChange}>
                            {techList.map((tech) => {
                                return (
                                    <option key={tech._id} value={tech.name}>
                                        {tech.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button className="btn btn-danger" type="submit">
                            Create Matchup!
                        </button>
                    </form>
                )}
            </div>
            {/* Add error handling */}
            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default Matchup;
