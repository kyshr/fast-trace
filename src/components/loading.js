import React from "react"
import { HashLoader } from "react-spinners"

const Loading = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
        >
            <HashLoader size={90} color="#5253ed" loading />
        </div>
    )
}

export default Loading
