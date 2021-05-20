/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/admin.scss"
import { getEstablishments } from "../../../services/admin_logs"
import { MdMenu } from "react-icons/md"
import AdminSidebar from "../Sidebar/admin_sidebar"

const AdminEstablishments = ({ logged, username }) => {
    const [showMenu, setShowMenu] = useState(true)
    const [noLogs, setNoLogs] = useState(true)
    const [search, setSearch] = useState("")
    const [establishments, setEstablishments] = useState([])

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

    useEffect(() => {
        loadEstablishments()
    }, [search])

    const loadEstablishments = async () => {
        var est = await getEstablishments(search)
        if (est.success) {
            setEstablishments(est.adminEstablishments)
            setNoLogs(false)
        } else {
            setEstablishments([])
            setNoLogs(true)
        }
    }

    const handleChange = (event) => {
        if (event.target.id === "search") {
            setSearch(event.target.value)
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
                    } admin-logs`}
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
                                <h3 className="ml-3">Establishments</h3>
                            </div>
                        </div>
                        <div className="admin-logs-main py-3 mb-3 white">
                            <div className="container-fluid h-100">
                                <div className="admin-logs-filter py-2 mb-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="filter-search">
                                                <div className="input-group mb-2">
                                                    <input
                                                        id="search"
                                                        type="text"
                                                        value={search}
                                                        className="form-control"
                                                        placeholder="Search Establishments"
                                                        onChange={handleChange}
                                                    />
                                                    <div className="input-group-append"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-logs-table">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead className="admin-logs-table-header">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">
                                                        Establishment ID
                                                    </th>
                                                    <th scope="col">
                                                        Establishment Name
                                                    </th>
                                                    <th scope="col">Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {establishments.map(
                                                    (value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">
                                                                    {index + 1}
                                                                </th>
                                                                <td>
                                                                    {
                                                                        value.establishmentId
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        value.establishmentName
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        value.address
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                        <h3
                                            className={`text-danger text-center ${
                                                noLogs ? "" : "d-none"
                                            }`}
                                        >
                                            No establishments registered.
                                        </h3>
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

export default AdminEstablishments
