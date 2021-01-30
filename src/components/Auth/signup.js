import React from "react";
import { Redirect } from "react-router-dom";
import "../../assets/scss/login.scss";
import logo from "../../assets/images/qr.jpg";

const Signup = ({ logged }) => {
    if (logged) {
        return <Redirect to="/" />;
    } else {
        return (
            <>
                <div style={{ paddingTop: "80px" }}>
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
                                            <form>
                                                <div className="form-group first">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        placeholder='Email'
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder='Password'
                                                    />
                                                </div>
                                                <div className="form-group last mb-4">
                                                    <input
                                                        type="cpassword"
                                                        className="form-control"
                                                        id="cpassword"
                                                        placeholder='Confirm Password'
                                                    />
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
        );
    }
};

export default Signup;
