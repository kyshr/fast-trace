import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Loading from "../loading"
import { QRCode } from "react-qr-svg"

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
                <div className="container d-flex align-items-center justify-content-center pt-5">
                    <QRCode
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="H"
                        style={{ width: 256 }}
                        value="Kyle Joseph Timajo"
                    />
                </div>
            </div>
        )
    } else {
        return <Redirect to="/login" />
    }
}

export default Home
