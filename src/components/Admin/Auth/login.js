import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/login.scss"
import logo from "../../../assets/images/qr.jpg"
import { adminLogin } from "../../../services/auth_admin"

const LoginAdmin = ({ logged, setLogged }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState({
        username: "",
        password: "",
        loginErr: "",
    })

    const handleChange = (event) => {
        if (event.target.id === "username") {
            setError((err) => {
                return { ...err, username: "" }
            })
            setUsername(event.target.value)
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
            try {
                setError((err) => {
                    return { ...err, loginErr: "" }
                })
                var login = await adminLogin(username, password)
                if (login.success) {
                    setLogged(true)
                } else {
                    setError((err) => {
                        return { ...err, loginErr: login.message }
                    })
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
        if (username === "") {
            setError((err) => {
                return {
                    ...err,
                    username: "Username is required.",
                }
            })
            noError = false
        }

        if (password === "") {
            setError((err) => {
                return { ...err, password: "Password is required." }
            })
            noError = false
        }

        return noError
    }

    if (logged) {
        return <Redirect to="/backend" />
    } else {
        return (
            <>
                <div>
                    <div className="auth-body login-content d-flex align-items-center py-0 py-md-4 mb-5">
                        <div className="container admin-login d-flex align-items-center">
                            <div className="row mx-auto">
                                <div className="col-md-6 d-flex align-items-center">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-4">
                                                <h3>Login to VTrace Admin</h3>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        placeholder="Username"
                                                        value={username}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.username}
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
                                                <p className="text-danger mt-3 text-center">
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

export default LoginAdmin
