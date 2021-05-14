import React from "react"
import { NavLink } from "react-router-dom"
import "../../assets/scss/navbar.scss"
import { adminLogout } from "../../services/auth_admin"
import { IoLogOutOutline } from "react-icons/io5"

const HomeNav = ({ setLogged }) => {
    return (
        <>
            <li
                className="nav-item logout-icon d-flex align-items-center"
                onClick={async () => {
                    await adminLogout()
                    setLogged(false)
                }}
            >
                <IoLogOutOutline /> <p className="my-auto">Logout</p>
            </li>
        </>
    )
}

const NavBarAdmin = ({ setLogged }) => {
    let Navigation = <HomeNav setLogged={setLogged} />

    return (
        <>
            <nav className="navigation d-flex align-items-center fixed-top">
                <div className="container-fluid d-flex align-items-center">
                    {/* logo */}
                    <div className="logo">
                        <NavLink exact to="/" className="logo-link">
                            <span className="logo-name">VTrace |</span>
                            <span className="logo-type"> Admin</span>
                        </NavLink>
                    </div>

                    {/* menu */}
                    <div className="nav-menu d-flex align-items-center ml-auto">
                        <div className="nav-items d-flex align-items-center">
                            {Navigation}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBarAdmin
