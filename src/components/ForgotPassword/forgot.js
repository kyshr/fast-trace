import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "../../assets/scss/login.scss"
import logo from "../../assets/images/qr.jpg"
// import { resetPassword } from "../../services/auth"

const Forgot = ({ logged }) => {
    const [email, setEmail] = useState("")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState({
        email: "",
        loginErr: "",
    })

    const handleChange = (event) => {
        if (event.target.id === "email") {
            setError((err) => {
                return { ...err, email: "" }
            })
            setEmail(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisable(true)
        if (handleError()) {
            try {
                setError((err) => {
                    return { ...err, loginErr: "" }
                })

                // await resetPassword(email)
                setDisable(false)
                setEmail("")
                window.alert("Reset password has been sent to your email.")
            } catch (error) {
                setError((err) => {
                    return {
                        ...err,
                        loginErr: error.message,
                    }
                })
                setEmail("")
                setDisable(false)
            }
        } else {
            setDisable(false)
        }
    }

    const handleError = () => {
        var noError = true
        if (email === "") {
            setError((err) => {
                return { ...err, email: "Email is required." }
            })
            noError = false
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(String(email).toLowerCase())) {
                setError((err) => {
                    return { ...err, email: "" }
                })
                noError = true
            } else {
                setError((err) => {
                    return { ...err, email: "Invalid email." }
                })
                noError = false
            }
        }
        return noError
    }

    if (logged) {
        return <Redirect to="/individual" />
    } else {
        return (
            <>
                <div style={{ paddingTop: "70px" }}>
                    <div className="content d-flex align-items-center py-0 py-md-4 mb-5">
                        <div className="container pt-2 pt-md-5">
                            <div className="row">
                                <div className="col-md-6 d-flex align-items-center">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-6 contents">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="mb-4">
                                                <h3>Forgot Password</h3>
                                            </div>
                                            <form onSubmit={handleSubmit}>
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
                                                <p className="text-danger">
                                                    {error.loginErr}
                                                </p>
                                                <input
                                                    type="submit"
                                                    value={
                                                        !disable
                                                            ? "Reset Password"
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

export default Forgot
