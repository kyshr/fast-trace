import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Loading from "../loading"
import { QRCode } from "react-qr-svg"
import "../../assets/scss/home.scss"

const Home = ({ logged }) => {
    const [loading, setLoading] = useState(true)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [barangay, setBarangay] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [contactnum, setContactnum] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 750)
    }, [])

    const handleChange = (e) => {
        var error = false
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
                error = true
                break
        }
        console.log(firstname)
        console.log(lastname)
        console.log(barangay)
        console.log(city)
        console.log(province)
        console.log(contactnum)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted")
    }

    if (logged) {
        return loading ? (
            <Loading />
        ) : (
            <div
                style={{ paddingTop: "70px", paddingBottom: "70px" }}
                className="container"
            >
                <div className="home-wrapper mx-auto">
                    <div className="home-qr-title text-center pt-4">
                        <h1>Generate QR Code</h1>
                    </div>
                    <div className="home-qr-code d-flex justify-content-center pt-4">
                        <QRCode
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                            level="H"
                            style={{ width: 256 }}
                            value="Kyle Joseph Timajo, 21, F, Compol, Catarman, Camiguin, 09759418084 | Joseph Timajo (Father), Lenee Timajo (Mother)"
                        />
                    </div>
                    <div className="home-qr-form mx-5 px-lg-5 pt-3">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstname">Firstname</label>
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
                                <label htmlFor="lastname">Lastname</label>
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
                                <label htmlFor="barangay">Barangay</label>
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
                                <label htmlFor="city">City/Municipality</label>
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
                                <label htmlFor="province">Province</label>
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
                                <label htmlFor="contactnum">Contact No.</label>
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
                            <button type="submit" className="btn btn-primary">
                                Download
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/login" />
    }
}

export default Home
