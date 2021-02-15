import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "../../assets/scss/home.scss"
import { QRCode } from "react-qr-svg"
import { Button, Spinner } from "react-bootstrap"
import domtoimage from "dom-to-image-more"
import { saveAs } from "file-saver"

const Home = ({ logged }) => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("Male")
    const [age, setAge] = useState("")
    const [barangay, setBarangay] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [contactnum, setContactnum] = useState("")
    const [qrString, setQrString] = useState("")
    const [download, setDownload] = useState(false)

    const handleChange = (e) => {
        switch (e.target.id) {
            case "firstname":
                setFirstname(e.target.value)
                break
            case "lastname":
                setLastname(e.target.value)
                break
            case "gender":
                setGender(e.target.value)
                break
            case "age":
                setAge(e.target.value)
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
            age !== "" &&
            gender !== "" &&
            barangay !== "" &&
            city !== "" &&
            province !== "" &&
            contactnum !== ""
        ) {
            setQrString(
                `${firstname}*${lastname}*${gender}*${age}*${barangay}, ${city}, ${province}*${contactnum}`
            )
        } else {
            setQrString("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted")

        if (qrString !== "") {
            setDownload(true)
            domtoimage
                .toBlob(document.getElementById("qr-svg"))
                .then((blob) => {
                    saveAs(blob, `${firstname} ${lastname} QR.png`)
                    setQrString("")
                    setDownload(false)
                })
                .catch((error) => {
                    setQrString("")
                    setDownload(false)
                })
        }
        resetFields()
    }

    const resetFields = (e) => {
        setFirstname("")
        setLastname("")
        setAge("")
        setGender("Male")
        setBarangay("")
        setCity("")
        setProvince("")
        setContactnum("")
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
                                            <div
                                                id="qr-svg"
                                                className="d-flex justify-content-center"
                                            >
                                                <QRCode
                                                    bgColor="#FFFFFF"
                                                    fgColor="#000000"
                                                    level="H"
                                                    style={{ width: 320 }}
                                                    value={qrString}
                                                />
                                            </div>
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
                                                    <label htmlFor="gender">
                                                        Gender
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        id="gender"
                                                        value={gender}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="Male">
                                                            Male
                                                        </option>
                                                        <option value="Female">
                                                            Female
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="age">
                                                        Age
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="age"
                                                        placeholder="Age"
                                                        onChange={handleChange}
                                                        onWheel={(e) =>
                                                            e.target.blur()
                                                        }
                                                        value={age}
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
                                                        onWheel={(e) =>
                                                            e.target.blur()
                                                        }
                                                        value={contactnum}
                                                        required
                                                    />
                                                </div>
                                                <div className="home-btn d-flex justify-content-end">
                                                    <Button
                                                        variant="danger"
                                                        type="button"
                                                        className="btn btn-danger mr-2"
                                                        onClick={() => {
                                                            resetFields()
                                                            setQrString("")
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
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
