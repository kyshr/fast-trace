import React, { useState } from "react"
import { Redirect, Link } from "react-router-dom"
import "../../assets/scss/login.scss"
import logo from "../../assets/images/qr.jpg"
import { individualLogin } from "../../services/auth"

const Login = ({ logged, setLogged }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState({
        email: "",
        password: "",
        loginErr: "",
    })

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
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisable(true)
        if (handleError()) {
            console.log("hello world")
            try {
                setError((err) => {
                    return { ...err, loginErr: "" }
                })

                var login = await individualLogin(email, password)
                if (login.success) {
                    setLogged(true)
                } else {
                    setDisable(false)
                }
            } catch (error) {
                setError((err) => {
                    return { ...err, loginErr: error.message }
                })
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
                return { ...err, email: "User ID is required." }
            })
            noError = false
        } else {
            // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            // if (re.test(String(email).toLowerCase())) {
            //     setError((err) => {
            //         return { ...err, email: "" }
            //     })
            noError = true
            // } else {
            //     setError((err) => {
            //         return { ...err, email: "Invalid email." }
            //     })
            // noError = false
            // }
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

        return noError
    }

    if (logged) {
        return <Redirect to="/" />
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
                                                <h3>Login to V-Trace</h3>
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
                                                        id="email"
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.email}
                                                    </p>
                                                </div>
                                                <div className="form-group last mb-2">
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
                                                <div className="forgot d-flex justify-content-end">
                                                    <Link
                                                        to="/forgot"
                                                        className="forgot-link"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                                <p className="text-danger mt-3">
                                                    {error.loginErr}
                                                </p>
                                                <input
                                                    type="submit"
                                                    value={
                                                        !disable
                                                            ? "Login"
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

export default Login
