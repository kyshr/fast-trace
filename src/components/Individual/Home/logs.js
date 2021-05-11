import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Modal, Spinner } from "react-bootstrap"
import "../../../assets/scss/logs.scss"

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

const Logs = ({ logged, userId }) => {
    const [userDates, setUserDates] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentDate, setCurrentDate] = useState("")

    const generateDateRange = () => {
        var dateNow = new Date()
        var dateList = []
        dateList.push(new Date().toISOString())
        console.log(new Date().toDateString())
        for (var x = 0; x < 13; x++) {
            dateList.push(
                new Date(dateNow.setDate(dateNow.getDate() - 1)).toISOString()
            )
        }
        console.log(dateList)
        setUserDates(dateList)
    }

    useEffect(() => {
        generateDateRange()
    }, [])

    const displayLogs = (date) => {
        console.log(date)
        setShowModal(true)
        setCurrentDate(new Date(date).toDateString())
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
                                        index % 2 == 0 ? "light" : "dark"
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
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>{currentDate}</h3>
                    </Modal.Title>
                </Modal.Header>
                <div className="logs-modal">
                    <h1>Hello</h1>
                </div>
            </Modal>
        </div>
    ) : (
        <Redirect to="/individual/login" />
    )
}

export default Logs
