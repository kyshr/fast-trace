import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/home.scss"
import { Button, Spinner } from "react-bootstrap"
import html2canvas from "html2canvas"
import { getIndividual } from "../../../services/auth"
var QRCode = require("qrcode.react")

const Home = ({ logged, userId }) => {
    const [download, setDownload] = useState(false)
    const [individual, setIndividual] = useState({})
    const [address, setAddress] = useState({})
    const [loading, setLoading] = useState(true)

    const loadIndividual = async () => {
        var user = await getIndividual(userId)
        if (user.success) {
            if (user.user.street !== "") {
                setAddress(
                    user.user.street +
                        ", " +
                        user.user.barangay +
                        ", " +
                        user.user.cityMun +
                        ", " +
                        user.user.province
                )
            } else {
                setAddress(
                    user.user.barangay +
                        ", " +
                        user.user.cityMun +
                        ", " +
                        user.user.province
                )
            }
            setIndividual(user.user)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadIndividual()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDownload(true)
        await html2canvas(document.getElementById("qr-svg"))
            .then((canvas) => {
                const image = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream")
                const a = document.createElement("a")
                a.setAttribute("download", `${individual.userId}_QR.png`)
                a.setAttribute("href", image)
                a.click()
                canvas.remove()
            })
            .catch((error) => {
                setDownload(false)
            })
        setDownload(false)
    }

    if (logged) {
        return (
            <div
                style={{ paddingTop: "70px", paddingBottom: "70px" }}
                className="container individual-home"
            >
                <div className="home-wrapper mx-auto">
                    <div className="card mt-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="home-qr-code text-center">
                                        {!loading ? (
                                            <>
                                                <div className="home-qr-fullname pt-4">
                                                    <h2>
                                                        {individual.firstname.toUpperCase()}{" "}
                                                        {individual.lastname.toUpperCase()}
                                                    </h2>
                                                </div>
                                                <div
                                                    id="qr-svg"
                                                    className="home-qr-template d-inline-block px-3 my-4 pt-4 pb-3"
                                                >
                                                    <div className="home-qr-title text-center mb-3">
                                                        <h4>
                                                            {individual.userId}
                                                        </h4>
                                                    </div>
                                                    <div className="d-flex justify-content-center mb-3">
                                                        <QRCode
                                                            bgColor="#FFFFFF"
                                                            fgColor="#000000"
                                                            level="H"
                                                            size={200}
                                                            value={
                                                                individual.userId
                                                            }
                                                        />
                                                    </div>
                                                    <div className="home-qr-info text-center mx-auto">
                                                        <h5>
                                                            {
                                                                individual.firstname
                                                            }{" "}
                                                            {
                                                                individual.lastname
                                                            }
                                                        </h5>
                                                        <h6>{address}</h6>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="home-qr-spinner py-5 my-5">
                                                <Spinner
                                                    variant="primary"
                                                    as="span"
                                                    animation="border"
                                                    size="xl"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="home-qr-download text-center mb-4">
                                        <form onSubmit={handleSubmit}>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="download-btn"
                                                disabled={download}
                                            >
                                                {download ? (
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    "Download"
                                                )}
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/individual/login" />
    }
}

export default Home
