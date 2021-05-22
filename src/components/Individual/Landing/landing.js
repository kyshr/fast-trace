import React from "react"
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
                            <div className="welcome-section text-center d-flex align-items-center">
                                <div>
                                    <h1 className="text-welcome">
                                        Welcome to VTrace
                                    </h1>
                                    <p className="vtrace-description">
                                        VTrace is the lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </p>
                                    <p className="i-would-like">
                                        <b>I would like to register as an</b>
                                    </p>
                                    <div className="buttons-row row">
                                        <div className="btns col-lg-6">
                                            <button>Individual</button>
                                        </div>
                                        <div className="btns col-lg-6">
                                            <button>Establishment</button>
                                        </div>
                                    </div>
                                    <div className="technical">
                                        <p className="vtrace-description">
                                            For any technical concerns, ut enim
                                            ad minim veniam, quis nostrud
                                            exercitation ullamco laboris.
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
