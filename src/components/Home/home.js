import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { QRCode } from "react-qr-svg"
import "../../assets/scss/home.scss"

const saveSvgAsPng = require("save-svg-as-png")
const imageOptions = {
    scale: 5,
    encoderOptions: 1,
    backgroundColor: "white",
}

const Home = ({ logged }) => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [barangay, setBarangay] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [contactnum, setContactnum] = useState("")
    const [qrString, setQrString] = useState("")

    const handleChange = (e) => {
        switch (e.target.id) {
            case "firstname":
                setFirstname(e.target.value)
                break
            case "lastname":
                setLastname(e.target.value)
                break
            case "barangay":
                setBarangay(e.target.value)
                break
            case "city":
                setCity(e.target.value)
                break
            case "province":
                setProvince(e.target.value)
                break
            case "contactnum":
                setContactnum(e.target.value)
                break
            default:
                console.log("This is default")
                break
        }

        if (
            firstname !== "" &&
            lastname !== "" &&
            barangay !== "" &&
            city !== "" &&
            province !== "" &&
            contactnum !== ""
        ) {
            setQrString(
                `${firstname} ${lastname}*${barangay}, ${city}, ${province}*${contactnum}`
            )
        } else {
            setQrString("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted")
        if (qrString !== "") {
            saveSvgAsPng
                .saveSvgAsPng(
                    document.getElementById("qr-svg"),
                    `${firstname} ${lastname} QR.png`,
                    imageOptions
                )
                .then(() => {
                    setQrString("")
                })
        }
        resetFields()
    }

    const resetFields = (e) => {
        setFirstname("")
        setLastname("")
        setBarangay("")
        setCity("")
        setProvince("")
        setContactnum("")
        setQrString("")
    }

    if (logged) {
        return (
            <div
                style={{ paddingTop: "70px", paddingBottom: "70px" }}
                className="container"
            >
                <div className="home-wrapper mx-auto">
                    <div className="card mt-3 mt-md-5">
                        <div className="card-body px-0">
                            <div className="home-qr-title text-center">
                                <h1>Generate QR Code</h1>
                            </div>
                            <div className="container pt-4">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="home-qr-code d-flex justify-content-center mb-4 mb-md-0 pt-1">
                                            <QRCode
                                                bgColor="#FFFFFF"
                                                fgColor="#000000"
                                                level="H"
                                                style={{ width: 320 }}
                                                value={qrString}
                                                id="qr-svg"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="home-qr-form">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="firstname">
                                                        Firstname
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstname"
                                                        placeholder="Firstname"
                                                        onChange={handleChange}
                                                        value={firstname}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastname">
                                                        Lastname
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastname"
                                                        placeholder="Lastname"
                                                        onChange={handleChange}
                                                        value={lastname}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="barangay">
                                                        Barangay
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="barangay"
                                                        placeholder="Barangay"
                                                        onChange={handleChange}
                                                        value={barangay}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="city">
                                                        City/Municipality
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="city"
                                                        placeholder="City/Municipality"
                                                        onChange={handleChange}
                                                        value={city}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="province">
                                                        Province
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="province"
                                                        placeholder="Province"
                                                        onChange={handleChange}
                                                        value={province}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="contactnum">
                                                        Contact No.
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="contactnum"
                                                        placeholder="Contact No."
                                                        onChange={handleChange}
                                                        value={contactnum}
                                                        required
                                                    />
                                                </div>
                                                <div className="home-btn d-flex justify-content-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger mr-2"
                                                        onClick={resetFields}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Download
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/login" />
    }
}

export default Home
