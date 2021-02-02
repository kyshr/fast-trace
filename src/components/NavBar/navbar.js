import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import "../../assets/scss/navbar.scss"
import Sidebar from "./sidebar"
import { auth } from "../../services/firebase"

const HomeNav = () => {
    return (
        <>
            <NavLink activeClassName="active" exact to="/" className="nav-item">
                Home
            </NavLink>
            <li
                className="nav-item"
                onClick={() => {
                    auth.signOut()
                }}
            >
                Logout
            </li>
        </>
    )
}

const AuthNav = () => {
    return (
        <>
            <NavLink
                activeClassName="active"
                exact
                to="/login"
                className="nav-item"
            >
                Login
            </NavLink>
            <NavLink
                activeClassName="active"
                exact
                to="/signup"
                className="nav-item"
            >
                Signup
            </NavLink>
        </>
    )
}

const NavBar = ({ logged, setLoading }) => {
    const [active, setActive] = useState(false)
    const showSideBar = () => setActive(!active)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                setActive(false)
            }
        }

        window.addEventListener("resize", handleResize)
    })

    let Navigation = logged ? <HomeNav /> : <AuthNav />

    return (
        <>
            <Sidebar active={active} toggle={showSideBar} logged={logged} />
            <nav className="navigation d-flex align-items-center fixed-top">
                <div className="container-fluid px-3 px-lg-5 d-flex align-items-center">
                    {/* logo */}
                    <div className="logo">
                        <NavLink exact to="/" className="logo-link">
                            <span className="logo-name">Fast Trace</span>
                        </NavLink>
                    </div>

                    {/* hamburger */}
                    <div
                        className="hamburger d-flex d-lg-none align-items-center ml-auto"
                        onClick={showSideBar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="45"
                            height="45"
                            fill="currentColor"
                            className="bi bi-filter-right menu"
                            viewBox="0 0 16 16"
                        >
                            <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
                        </svg>
                    </div>

                    {/* menu */}
                    <div className="nav-menu d-none d-lg-flex align-items-center ml-auto">
                        <div className="nav-items d-flex align-items-center">
                            {Navigation}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
