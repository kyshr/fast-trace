import React from "react"
import { NavLink } from "react-router-dom"
import "../../assets/scss/navbar.scss"

const HomeNav = ({ toggle }) => {
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
            <NavLink
                activeClassName="active"
                exact
                to="/individual"
                className="side-item"
                onClick={toggle}
            >
                Individual
            </NavLink>
            <NavLink
                activeClassName="active"
                exact
                to="/"
                className="side-item"
                onClick={toggle}
            >
                Estabslishment
            </NavLink>
        </>
    )
}

const SidebarIndex = ({ active, toggle }) => {
    let Navigation = <HomeNav toggle={toggle} />

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
    )
}

export default SidebarIndex
