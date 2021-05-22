import React from "react"
import { Link } from "react-router-dom"
import "../../../assets/scss/landing.scss"
import logo from "../../../assets/images/4121365.png"

const Landing = () => {
    return (
        <div className="landing">
            <div className="landing-content">
                <div className="container-fluid landing-cont">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="landing-img d-flex justify-content-center">
                                <img className="img-logo" src={logo} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="welcome-section text-center d-flex align-items-center justify-content-center">
                                <div>
                                    <h1 className="text-welcome">
                                        Welcome to VTrace
                                    </h1>
                                    <p className="vtrace-description">
                                        VTrace is an android app that is
                                        intended for contact tracing.
                                    </p>
                                    <p className="i-would-like">
                                        <b>Register as an</b>
                                    </p>
                                    <div className="buttons-row row">
                                        <Link
                                            activeClassName="active"
                                            exact
                                            to="/individual"
                                            className="btns col-lg-6"
                                        >
                                            <div>
                                                <button>Individual</button>
                                            </div>
                                        </Link>
                                        <Link
                                            activeClassName="active"
                                            exact
                                            to="/establishment"
                                            className="btns col-lg-6"
                                        >
                                            <div>
                                                <button>Establishment</button>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="technical">
                                        <p className="vtrace-description">
                                            For any technical concerns, email us
                                            on vtrace@gmail.com.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
