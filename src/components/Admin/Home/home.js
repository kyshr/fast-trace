import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/admin.scss"
import { getAdminLogs, getScanCount } from "../../../services/admin_logs"
import { MdMenu } from "react-icons/md"
import AdminSidebar from "../Sidebar/admin_sidebar"
import qrHome from "../../../assets/images/qr_home.PNG"

const AdminHome = ({ logged, username }) => {
    const [adminLogins, setAdminLogins] = useState([])
    const [count, setCount] = useState("0")
    const [showMenu, setShowMenu] = useState(true)

    useEffect(() => {
        getAdminLogins()
        return () => {
            setAdminLogins([])
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 767) {
                setShowMenu(true)
            } else {
                setShowMenu(false)
            }
        }

        window.addEventListener("resize", handleResize)
    })

    const getAdminLogins = async () => {
        var adminLogs = await getAdminLogs()
        var logsCount = await getScanCount()
        if (adminLogs.success) {
            setAdminLogins(adminLogs.adminLogs)
        } else {
            setAdminLogins([])
        }

        if (logsCount.success) {
            setCount(logsCount.count)
        }
    }
    return logged ? (
        <>
            <AdminSidebar
                username={username}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            />
            <div className="admin-wrapper d-flex">
                <div
                    className={`admin-content ${
                        showMenu ? "admin-narrow" : ""
                    } admin-dashboard`}
                >
                    <div className="container-fluid pt-2">
                        <div className="admin-title d-flex py-2 mb-3 white">
                            <div
                                className={`admin-title-hamburger ml-2 ${
                                    showMenu ? "d-none" : ""
                                }`}
                            >
                                <MdMenu
                                    size={32}
                                    onClick={() => setShowMenu(true)}
                                />
                            </div>
                            <div>
                                <h3 className="ml-3">Dashboard</h3>
                            </div>
                        </div>
                        <div className="row sample">
                            <div className="col-md-6 mb-2">
                                <div className="admin-recent-logins py-2 px-3 white">
                                    <h3>Recent Logins</h3>
                                    <div className="admin-logins">
                                        <ul className="list-group list-group-flush">
                                            {adminLogins.map((value, index) => {
                                                var date = new Date(
                                                    value.dateTime
                                                ).toLocaleString()

                                                return (
                                                    <li
                                                        key={index}
                                                        className="list-group-item text-center"
                                                    >
                                                        {value.username} -{" "}
                                                        {date}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="admin-total-scans py-2 px-3 white">
                                    <h3>Total Scans</h3>
                                    <div className="admin-scans">
                                        <div className="row">
                                            <div className="col-lg-6 text-center">
                                                <img
                                                    src={qrHome}
                                                    alt="qrImage"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                                <div className="number-scan text-center">
                                                    <h1>{count}</h1>
                                                    <h4>
                                                        # of scans as of today
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <Redirect to="/backend/login" />
    )
}

export default AdminHome
