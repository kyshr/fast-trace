import React from "react";
import { Redirect } from "react-router-dom";
const Home = ({ logged }) => {
    if (logged) {
        return (
            <div style={{ paddingTop: "70px" }}>
                <h1>Home Page</h1>
            </div>
        );
    } else {
        return <Redirect to="/login" />;
    }
};

export default Home;
