import React from "react"
import "../../../assets/scss/admin_sidebar.scss"
import { NavLink } from "react-router-dom"
import { IoMdPerson } from "react-icons/io"
import { MdDashboard, MdAssignment, MdStore, MdSettings } from "react-icons/md"

const AdminSidebar = (props) => {
    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-header mb-4">
                <div className="sidebar-account-icon text-center">
                    <IoMdPerson size={120} />
                </div>
                <div className="sidebar-username text-center">
                    <p>{props.username}</p>
                </div>
            </div>
            <div className="sidebar-menus">
                <NavLink
                    activeClassName="menu-active"
                    exact
                    to="/backend"
                    className="menu py-2 pl-3 d-flex align-items-center"
                >
                    <span className="pr-3 menu-icon">
                        <MdDashboard size={30} />
                    </span>
                    <span className="menu-title">Dashboard</span>
                </NavLink>
                <NavLink
                    activeClassName="menu-active"
                    exact
                    to="/backend/logs"
                    className="menu py-2 pl-3 d-flex align-items-center"
                >
                    <span className="pr-3 menu-icon">
                        <MdAssignment size={30} />
                    </span>
                    <span className="menu-title">Logs</span>
                </NavLink>
                <NavLink
                    activeClassName="menu-active"
                    exact
                    to="/backend/establishments"
                    className="menu py-2 pl-3 d-flex align-items-center"
                >
                    <span className="pr-3 menu-icon">
                        <MdStore size={30} />
                    </span>
                    <span className="menu-title">Establishments</span>
                </NavLink>
                <NavLink
                    activeClassName="menu-active"
                    exact
                    to="/backend/settings"
                    className="menu py-2 pl-3 d-flex align-items-center"
                >
                    <span className="pr-3 menu-icon">
                        <MdSettings size={30} />
                    </span>
                    <span className="menu-title">Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar
