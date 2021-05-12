import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/login.scss"
import logo from "../../../assets/images/qr.jpg"
import {
    establishmentLogin,
    createEstablishment,
} from "../../../services/auth_establishment"

const SignupEstablishment = ({ logged, setLogged }) => {
    const [establishmentName, setEstablishmentName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [street, setStreet] = useState("")
    const [barangay, setBarangay] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState({
        establishmentName: "",
        contactNumber: "",
        street: "",
        barangay: "",
        city: "",
        province: "",
        email: "",
        password: "",
        confirm: "",
        signupErr: "",
    })

    const handleChange = (event) => {
        if (event.target.id === "establishmentName") {
            setError((err) => {
                return { ...err, establishmentName: "" }
            })
            setEstablishmentName(event.target.value)
        } else if (event.target.id === "contactNumber") {
            setError((err) => {
                return { ...err, contactNumber: "" }
            })
            setContactNumber(event.target.value)
        } else if (event.target.id === "street") {
            setError((err) => {
                return { ...err, street: "" }
            })
            setStreet(event.target.value)
        } else if (event.target.id === "barangay") {
            setError((err) => {
                return { ...err, barangay: "" }
            })
            setBarangay(event.target.value)
        } else if (event.target.id === "city") {
            setError((err) => {
                return { ...err, city: "" }
            })
            setCity(event.target.value)
        } else if (event.target.id === "province") {
            setError((err) => {
                return { ...err, province: "" }
            })
            setProvince(event.target.value)
        } else if (event.target.id === "email") {
            setError((err) => {
                return { ...err, email: "" }
            })
            setEmail(event.target.value)
        } else if (event.target.id === "password") {
            setError((err) => {
                return { ...err, password: "" }
            })
            setPassword(event.target.value)
        } else if (event.target.id === "cpassword") {
            setError((err) => {
                return { ...err, confirm: "" }
            })
            setConfirm(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisable(true)
        if (handleError()) {
            try {
                setError((err) => {
                    return { ...err, signupErr: "" }
                })

                var newEstablishment = await createEstablishment({
                    email: email,
                    password: password,
                    establishmentName: establishmentName,
                    contactNumber: contactNumber,
                    street: street,
                    barangay: barangay,
                    cityMun: city,
                    province: province,
                })

                if (newEstablishment.success) {
                    var login = await establishmentLogin(
                        newEstablishment.establishment.establishmentId,
                        password
                    )
                    if (login.success) {
                        setLogged(true)
                    }
                } else {
                    setError((err) => {
                        return { ...err, signupErr: newEstablishment.message }
                    })
                }
            } catch (error) {
                setError((err) => {
                    return { ...err, signupErr: newEstablishment.message }
                })
                setDisable(false)
            }
        } else {
            setDisable(false)
        }
    }

    const handleError = () => {
        var noError = true
        if (establishmentName === "") {
            setError((err) => {
                return {
                    ...err,
                    establishmentName: "Establishment Name is required.",
                }
            })
            noError = false
        }
        if (contactNumber === "") {
            setError((err) => {
                return { ...err, contactNumber: "Contact no. is required." }
            })
            noError = false
        }
        if (barangay === "") {
            setError((err) => {
                return { ...err, barangay: "Barangay is required." }
            })
            noError = false
        }
        if (city === "") {
            setError((err) => {
                return { ...err, city: "City/Municipality is required." }
            })
            noError = false
        }
        if (province === "") {
            setError((err) => {
                return { ...err, province: "Province is required." }
            })
            noError = false
        }
        if (email === "") {
            setError((err) => {
                return { ...err, email: "Email is required." }
            })
            noError = false
        } else {
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(String(email).toLowerCase())) {
                setError((err) => {
                    return { ...err, email: "" }
                })
            } else {
                setError((err) => {
                    return { ...err, email: "Invalid email." }
                })
                noError = false
            }
        }

        if (password === "") {
            setError((err) => {
                return { ...err, password: "Password is required." }
            })
            noError = false
        } else if (password.length > 0 && password.length < 8) {
            setError((err) => {
                return {
                    ...err,
                    password: "Password should be greater than 8 characters.",
                }
            })
            noError = false
        }

        if (confirm === "") {
            setError((err) => {
                return { ...err, confirm: "Confirm Password is required." }
            })
            noError = false
        } else if (password !== confirm) {
            setError((err) => {
                return {
                    ...err,
                    confirm: "Password doesn't match.",
                }
            })
            noError = false
        }
        return noError
    }
    if (logged) {
        return <Redirect to="/establishment" />
    } else {
        return (
            <>
                <div style={{ paddingTop: "70px" }}>
                    <div className="auth-body content d-flex align-items-center py-0 py-md-4 mb-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-12 contents">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-8">
                                            <div className="mb-4 text-center">
                                                <h3>Signup to V-Trace</h3>
                                                <p className="mb-4">
                                                    V-Trace is an android app
                                                    that is intended for contact
                                                    tracing.
                                                </p>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="establishmentName"
                                                        placeholder="Establishment Name"
                                                        value={
                                                            establishmentName
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {
                                                            error.establishmentName
                                                        }
                                                    </p>
                                                </div>

                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="contactNumber"
                                                        placeholder="Contact No."
                                                        value={contactNumber}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.contactNumber}
                                                    </p>
                                                </div>
                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="street"
                                                        placeholder="Street/Subdivision (Optional)"
                                                        value={street}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.street}
                                                    </p>
                                                </div>
                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="barangay"
                                                        placeholder="Barangay"
                                                        value={barangay}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.barangay}
                                                    </p>
                                                </div>
                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="city"
                                                        placeholder="City/Municipality"
                                                        value={city}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.city}
                                                    </p>
                                                </div>
                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="province"
                                                        placeholder="Province"
                                                        value={province}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.province}
                                                    </p>
                                                </div>
                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.email}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.password}
                                                    </p>
                                                </div>
                                                <div className="form-group last mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="cpassword"
                                                        placeholder="Confirm Password"
                                                        value={confirm}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.confirm}
                                                    </p>
                                                </div>
                                                <p className="text-danger">
                                                    {error.signupErr}
                                                </p>
                                                <input
                                                    type="submit"
                                                    value={
                                                        !disable
                                                            ? "Signup"
                                                            : "Loading..."
                                                    }
                                                    className="btn btn-block btn-primary"
                                                    disabled={disable}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignupEstablishment
