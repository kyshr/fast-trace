import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "../../assets/scss/login.scss"
import logo from "../../assets/images/qr.jpg"

const Signup = ({ logged }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState({ email: "", password: "", confirm: "" })

    const handleChange = (event) => {
        if (event.target.id === "email") {
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

    const handleSubmit = (event) => {
        event.preventDefault()
        handleError()
        console.log(`${email} ${password} ${confirm}`)
        console.log(error)
    }

    const handleError = () => {
        if (email === "") {
            // setEmailErr('Email is required');
            setError((err) => {
                return { ...err, email: "Email is required." }
            })
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(String(email).toLowerCase())) {
                setError((err) => {
                    return { ...err, email: "" }
                })
            } else {
                setError((err) => {
                    return { ...err, email: "Invalid email." }
                })
            }
        }

        if (password === "") {
            // setPasswordErr('Password is required');
            setError((err) => {
                return { ...err, password: "Password is required." }
            })
        } else if (password.length > 0 && password.length < 8) {
            setError((err) => {
                return {
                    ...err,
                    password: "Password should be greater than 8 characters.",
                }
            })
        }

        if (confirm === "") {
            setError((err) => {
                return { ...err, confirm: "Confirm Password is required." }
            })
        } else if (password !== confirm) {
            setError((err) => {
                return {
                    ...err,
                    confirm: "Password doesn't match.",
                }
            })
        }
    }
    if (logged) {
        return <Redirect to="/" />
    } else {
        return (
            <>
                <div style={{ paddingTop: "70px" }}>
                    <div className="content d-flex align-items-center py-md-5">
                        <div className="container px-4 px-md-0">
                            <div className="row">
                                <div className="col-md-6 d-flex align-items-center">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="img-fluid d-none d-md-block"
                                    />
                                </div>
                                <div className="col-md-6 contents">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="mb-4">
                                                <h3>Signup to Fast Trace</h3>
                                                <p className="mb-4">
                                                    Fast Trace is an android app
                                                    that is intended for contact
                                                    tracing.
                                                </p>
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

                                                <input
                                                    type="submit"
                                                    value="Signup"
                                                    className="btn btn-block btn-primary"
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

export default Signup
