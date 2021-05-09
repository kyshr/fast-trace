import React from "react"
import { HashLoader } from "react-spinners"
import "../assets/scss/loading.scss"

const Loading = () => {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100vh" }}
        >
            <h1 className="loading-text">V-Trace</h1>
            <HashLoader size={90} color="#5253ed" loading />
        </div>
    )
}

export default Loading
