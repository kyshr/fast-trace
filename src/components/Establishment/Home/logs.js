import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Modal, Spinner } from "react-bootstrap"
import { getIndividualLogsByDate } from "../../../services/individual_logs"
import "../../../assets/scss/logs.scss"
import "../../../assets/scss/logs_modal.css"

const DateBox = ({ dateString, date, onClick, color }) => {
    return (
        <>
            <div
                className={`logs-date-box ${color} text-center py-2 mb-3`}
                onClick={() => onClick(date)}
            >
                <h6>{dateString}</h6>
            </div>
        </>
    )
}

const LogsEstablishment = ({ logged, userId }) => {
    const [userDates, setUserDates] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [currentLogs, setCurrentLogs] = useState([])
    const [modalError, setModalError] = useState("")
    const [currentDate, setCurrentDate] = useState("")

    useEffect(() => {
        generateDateRange()
    }, [])

    const generateDateRange = () => {
        var dateNow = new Date()
        var dateList = []
        dateList.push(new Date().toISOString())
        for (var x = 0; x < 13; x++) {
            dateList.push(
                new Date(dateNow.setDate(dateNow.getDate() - 1)).toISOString()
            )
        }
        setUserDates(dateList)
    }

    const getLogs = async (dateTime) => {
        var userLogs = await getIndividualLogsByDate(userId, dateTime)
        if (userLogs.success) {
            setCurrentLogs(userLogs.userLogs)
            setModalLoading(false)
        } else {
            setCurrentLogs([])
            setModalLoading(false)
            setModalError("You have no logs in this date.")
        }
    }

    const displayLogs = (date) => {
        setModalLoading(true)
        setModalError("")
        setShowModal(true)
        setCurrentDate(new Date(date).toDateString())
        getLogs(date)
    }

    const closeModal = () => {
        setShowModal(false)
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
        <div
            style={{ paddingTop: "70px", paddingBottom: "70px" }}
            className="container individual-logs"
        >
            <div className="container pt-4">
                <div className="card py-4 px-3">
                    <div className="logs-title">
                        <h5 className="text-center mb-4">
                            Your logs in the last 14 days.
                        </h5>
                    </div>

                    <div className="row">
                        <div className="col-12 col-sm-9 col-lg-7 mx-auto">
                            <div className="logs-date-wrapper text-center">
                                {userDates.map((value, index) => {
                                    var color =
                                        index % 2 === 0 ? "light" : "dark"
                                    return (
                                        <DateBox
                                            key={index}
                                            dateString={new Date(
                                                value
                                            ).toDateString()}
                                            date={value}
                                            onClick={displayLogs}
                                            color={color}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                contentClassName="logs-modal"
                show={showModal}
                onHide={closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                animation={false}
                scrollable={true}
            >
                <Modal.Header className="logs-modal-header" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>{currentDate}</h4>
                    </Modal.Title>
                </Modal.Header>
                <div className="logs-list text-center">
                    {modalLoading ? (
                        <div className="logs-modal-spinner text-center py-5">
                            <Spinner
                                variant="primary"
                                as="span"
                                animation="border"
                                size="xl"
                                role="status"
                                aria-hidden="true"
                            />
                        </div>
                    ) : modalError !== "" ? (
                        <h3 className="mt-5">{modalError}</h3>
                    ) : (
                        <ul className="list-group list-group-flush">
                            {currentLogs.map((value, index) => {
                                var timeString = formatAMPM(
                                    new Date(value.dateTime)
                                )
                                return (
                                    <li key={index} className="list-group-item">
                                        <div className="logs-history d-flex justify-content-between">
                                            <p className="logs-establishment">
                                                {
                                                    value.establishment
                                                        .establishmentName
                                                }
                                            </p>
                                            <p className="logs-time">
                                                {timeString}
                                            </p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </Modal>
        </div>
    ) : (
        <Redirect to="/establishment/login" />
    )
}

export default LogsEstablishment
