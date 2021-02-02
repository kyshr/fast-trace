import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Loading from "../loading"

const Home = ({ logged }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    if (logged) {
        return loading ? (
            <Loading />
        ) : (
            <div style={{ paddingTop: "70px" }}>
                <h1>Home Page</h1>
            </div>
        )
    } else {
        return <Redirect to="/login" />
    }
}

export default Home
