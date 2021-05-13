import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/home.scss"
import { Button, Spinner } from "react-bootstrap"
import html2canvas from "html2canvas"
import { getEstablishment } from "../../../services/auth_establishment"
import company from "../../../assets/images/company.png"
// var QRCode = require("qrcode.react")

const HomeEstablishment = ({ logged, establishmentId }) => {
    const [download, setDownload] = useState(false)
    const [establishment, setEstablishment] = useState({})
    const [address, setAddress] = useState({})
    const [loading, setLoading] = useState(true)

    const loadEstablishment = async () => {
        var establishment = await getEstablishment(establishmentId)
        if (establishment.success) {
            if (establishment.establishment.street !== "") {
                setAddress(
                    establishment.establishment.street +
                        ", " +
                        establishment.establishment.barangay +
                        ", " +
                        establishment.establishment.cityMun +
                        ", " +
                        establishment.establishment.province
                )
            } else {
                setAddress(
                    establishment.establishment.barangay +
                        ", " +
                        establishment.establishment.cityMun +
                        ", " +
                        establishment.establishment.province
                )
            }
            setEstablishment(establishment.establishment)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadEstablishment()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDownload(true)
        window.scrollTo(0, 0)
        await html2canvas(document.getElementById("qr-svg"))
            .then((canvas) => {
                const image = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream")
                const a = document.createElement("a")
                a.setAttribute(
                    "download",
                    `${establishment.establishmentId}_QR.png`
                )
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
                    <div className="card mt-4 py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="home-qr-code text-center">
                                        {!loading ? (
                                            <>
                                                <div className="home-qr-fullname">
                                                    <h2>
                                                        {establishment.establishmentName.toUpperCase()}
                                                    </h2>
                                                    <p>
                                                        <span>
                                                            {
                                                                establishment.establishmentId
                                                            }
                                                        </span>{" "}
                                                        served as Establishment
                                                        ID that will be used in
                                                        login.
                                                    </p>
                                                </div>
                                                <div
                                                    id="qr-svg"
                                                    className="home-qr-template d-inline-block px-1 mt-3 mb-4 pt-4 pb-3"
                                                >
                                                    <div className="home-qr-title text-center mb-3">
                                                        <h4>
                                                            {
                                                                establishment.establishmentId
                                                            }
                                                        </h4>
                                                    </div>
                                                    <div className="d-flex justify-content-center mb-3">
                                                        {/* <QRCode
                                                            bgColor="#FFFFFF"
                                                            fgColor="#000000"
                                                            level="H"
                                                            size={150}
                                                            value={
                                                                establishment.establishmentId
                                                            }
                                                        /> */}
                                                        <img
                                                            src={company}
                                                            alt="company"
                                                            className="img-fluid"
                                                            style={{
                                                                width: "150px",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="home-qr-info text-center mx-auto">
                                                        <h5>
                                                            {
                                                                establishment.establishmentName
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
        return <Redirect to="/establishment/login" />
    }
}

export default HomeEstablishment
