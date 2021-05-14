import React from "react"
import { Redirect } from "react-router-dom"

const AdminHome = ({ logged, username }) => {
    return logged ? (
        <div style={{ paddingTop: "70px" }}>
            <h1>Hello {username}</h1>
        </div>
    ) : (
        <Redirect to="/backend/login" />
    )
}

export default AdminHome
