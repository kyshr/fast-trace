import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/admin.scss"
import { getAdminUserLogs } from "../../../services/admin_logs"
import { MdMenu } from "react-icons/md"
import AdminSidebar from "../Sidebar/admin_sidebar"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const AdminUserLogs = ({ logged, username }) => {
    const [showMenu, setShowMenu] = useState(true)
    const [noLogs, setNoLogs] = useState(true)
    const [logsDate, setLogsDate] = useState(
        new Date().toISOString().slice(0, 10)
    )
    const [search, setSearch] = useState("")
    const [userLogs, setUserLogs] = useState([])

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
        loadAdminUserLogs()
    }, [search, logsDate])

    const loadAdminUserLogs = async () => {
        var logs = await getAdminUserLogs(logsDate, search)
        if (logs.success) {
            setUserLogs(logs.adminUserLogs)
            setNoLogs(false)
        } else {
            setUserLogs([])
            setNoLogs(true)
        }
    }

    const handleChange = (event) => {
        if (event.target.id === "date") {
            setLogsDate(event.target.value)
        } else if (event.target.id === "search") {
            setSearch(event.target.value)
        }
    }

    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            flexWrap: "wrap",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }))

    const DatePicker = () => {
        const classes = useStyles()

        return (
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="Select Date"
                    type="date"
                    defaultValue={logsDate}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                />
            </form>
        )
    }

    const formatAMPM = (date) => {
        var hours = date.getUTCHours()
        var minutes = date.getUTCMinutes()
        var ampm = hours >= 12 ? "PM" : "AM"
        hours = hours % 12
        hours = hours ? hours : 12
        minutes = minutes < 10 ? "0" + minutes : minutes
        var strTime = hours + ":" + minutes + " " + ampm
        return strTime
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
                                <h3 className="ml-3">Logs</h3>
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
                                                        placeholder="Search Person"
                                                        onChange={handleChange}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            type="button"
                                                        >
                                                            Search
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="filter-date">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <DatePicker />
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
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">
                                                        Establishment
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userLogs.map(
                                                    (value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">
                                                                    {index + 1}
                                                                </th>
                                                                <td>
                                                                    {
                                                                        value
                                                                            .user
                                                                            .firstname
                                                                    }{" "}
                                                                    {
                                                                        value
                                                                            .user
                                                                            .lastname
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {formatAMPM(
                                                                        new Date(
                                                                            value.dateTime
                                                                        )
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        value
                                                                            .establishment
                                                                            .establishmentName
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
                                            No logs in this date.
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

export default AdminUserLogs
