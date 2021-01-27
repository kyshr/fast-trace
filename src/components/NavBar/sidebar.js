import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/scss/navbar.scss";

const HomeNav = ({ setLogged, toggle }) => {
    return (
        <>
            <NavLink
                activeClassName="active"
                exact
                to="/"
                className="side-item"
                onClick={toggle}
            >
                Home
            </NavLink>
            <li
                className="side-item"
                onClick={() => {
                    setLogged(false);
                    toggle();
                }}
            >
                Logout
            </li>
        </>
    );
};

const AuthNav = ({ toggle }) => {
    return (
        <>
            <NavLink
                activeClassName="active"
                exact
                to="/login"
                className="side-item"
                onClick={toggle}
            >
                Login
            </NavLink>
            <NavLink
                activeClassName="active"
                exact
                to="/signup"
                className="side-item"
                onClick={toggle}
            >
                Signup
            </NavLink>
        </>
    );
};

const Sidebar = ({ active, toggle, logged, setLogged }) => {
    let Navigation = logged ? (
        <HomeNav setLogged={setLogged} toggle={toggle} />
    ) : (
        <AuthNav toggle={toggle} />
    );

    return (
        <div
            className={
                active
                    ? "side-menu d-flex flex-column sideactive"
                    : "side-menu d-flex flex-column"
            }
        >
            <div
                className="close px-2 d-flex justify-content-end align-items-center"
                onClick={toggle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div className="side-items d-flex flex-column align-items-center">
                {Navigation}
            </div>
        </div>
    );
};

export default Sidebar;
