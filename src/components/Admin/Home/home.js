import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/admin.scss"
import AdminSidebar from "../Sidebar/admin_sidebar"

const AdminHome = ({ logged, username }) => {
    const [narrowMenu, setNarrowMenu] = useState(false)
    return logged ? (
        <div className="admin-wrapper d-flex">
            <div className={`admin-menu ${narrowMenu ? "narrow" : ""}`}>
                <AdminSidebar username={username} />
            </div>
            <div className="admin-content px-3 pink">
                <h1>This is content</h1>
                <button onClick={() => setNarrowMenu(!narrowMenu)}>
                    Click
                </button>
            </div>
        </div>
    ) : (
        <Redirect to="/backend/login" />
    )
}

export default AdminHome
