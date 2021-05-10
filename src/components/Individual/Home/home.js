import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/home.scss"
import { Button, Spinner } from "react-bootstrap"
import html2canvas from "html2canvas"
var QRCode = require("qrcode.react")

const Home = ({ logged, userId }) => {
    const [download, setDownload] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDownload(true)
        await html2canvas(document.getElementById("qr-svg"))
            .then((canvas) => {
                const image = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream")
                const a = document.createElement("a")
                a.setAttribute("download", "my-image.png")
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
                                        <div
                                            id="qr-svg"
                                            className="home-qr-template d-inline-block px-3 my-4 pt-4 pb-3"
                                        >
                                            <div className="home-qr-title text-center mb-3">
                                                <h4>{userId}</h4>
                                            </div>
                                            <div className="d-flex justify-content-center mb-3">
                                                <QRCode
                                                    bgColor="#FFFFFF"
                                                    fgColor="#000000"
                                                    level="H"
                                                    size={200}
                                                    // style={{ width: 200 }}
                                                    value={userId}
                                                />
                                            </div>
                                            <div className="home-qr-info text-center mx-auto">
                                                <h5>Kyle Joseph Timajo</h5>
                                                <h6>
                                                    Compol, Catarman, Camiguin
                                                </h6>
                                            </div>
                                        </div>
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
