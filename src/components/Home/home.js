import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Loading from "../loading"
import { QRCode } from "react-qr-svg"
import "../../assets/scss/home.scss"

const Home = ({ logged }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 750)
    }, [])

    if (logged) {
        return loading ? (
            <Loading />
        ) : (
            <div style={{ paddingTop: "70px" }} className="container">
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
                            value="Kyle Joseph Timajo"
                        />
                    </div>
                    <div className="home-qr-form mx-5 px-lg-5 pt-3">
                        <form>
                            <div class="form-group">
                                <label for="firstname">Firstname</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="firstname"
                                    placeholder="Firstname"
                                />
                            </div>
                            <div class="form-group">
                                <label for="lastname">Lastname</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="lastname"
                                    placeholder="Lastname"
                                />
                            </div>
                            <div class="form-group">
                                <label for="barangay">Barangay</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="barangay"
                                    placeholder="Barangay"
                                />
                            </div>
                            <div class="form-group">
                                <label for="city">City/Municipality</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="city"
                                    placeholder="City/Municipality"
                                />
                            </div>
                            <div class="form-group">
                                <label for="province">Province</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="province"
                                    placeholder="Province"
                                />
                            </div>
                            <div class="form-group">
                                <label for="contactnum">Contact No.</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="contactnum"
                                    placeholder="Contact No."
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Submit
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
