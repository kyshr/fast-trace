import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import "../../../assets/scss/profile.scss"
import {
    getEstablishment,
    passwordMatched,
    updateEstablishment,
    updateEstablishmentPassword,
} from "../../../services/auth_establishment"

const ProfileEstablishment = ({ logged, establishmentId }) => {
    const [establishmentName, setEstablishment] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [street, setStreet] = useState("")
    const [barangay, setBarangay] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [disable, setDisable] = useState(false)
    const [edit, setEdit] = useState(true)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState({
        establishmentName: "",
        contactNumber: "",
        street: "",
        barangay: "",
        city: "",
        province: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        signupErr: "",
    })

    var updatePassword = false

    const loadEstablishment = async () => {
        var establishment = await getEstablishment(establishmentId)
        if (establishment.success) {
            setEstablishment(establishment.establishment.establishmentName)
            setContactNumber(establishment.establishment.contactNumber)
            setStreet(establishment.establishment.street)
            setBarangay(establishment.establishment.barangay)
            setCity(establishment.establishment.cityMun)
            setProvince(establishment.establishment.province)
            setEmail(establishment.establishment.email)
        }
    }

    useEffect(() => {
        loadEstablishment()
        setOldPassword("")
        setNewPassword("")
    }, [edit])

    const handleChange = (event) => {
        if (event.target.id === "establishmentName") {
            setError((err) => {
                return { ...err, establishmentName: "" }
            })
            setEstablishment(event.target.value)
        } else if (event.target.id === "contactNumber") {
            setError((err) => {
                return { ...err, contactNumber: "" }
            })
            setContactNumber(event.target.value)
        } else if (event.target.id === "street") {
            setError((err) => {
                return { ...err, street: "" }
            })
            setStreet(event.target.value)
        } else if (event.target.id === "barangay") {
            setError((err) => {
                return { ...err, barangay: "" }
            })
            setBarangay(event.target.value)
        } else if (event.target.id === "city") {
            setError((err) => {
                return { ...err, city: "" }
            })
            setCity(event.target.value)
        } else if (event.target.id === "province") {
            setError((err) => {
                return { ...err, province: "" }
            })
            setProvince(event.target.value)
        } else if (event.target.id === "email") {
            setError((err) => {
                return { ...err, email: "" }
            })
            setEmail(event.target.value)
        } else if (event.target.id === "oldPassword") {
            setError((err) => {
                return { ...err, oldPassword: "" }
            })
            setOldPassword(event.target.value)
        } else if (event.target.id === "newPassword") {
            setError((err) => {
                return { ...err, newPassword: "" }
            })
            setNewPassword(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!edit) {
            var noError = await handleError()
            setSuccess("")
            if (noError) {
                try {
                    setDisable(true)
                    setError((err) => {
                        return { ...err, signupErr: "" }
                    })

                    var updateData = (updateData = {
                        establishmentName: establishmentName,
                        contactNumber: contactNumber,
                        street: street,
                        barangay: barangay,
                        cityMun: city,
                        province: province,
                        email: email,
                    })
                    if (updatePassword) {
                        var updatedPassword = await updateEstablishmentPassword(
                            {
                                establishmentId: establishmentId,
                                updateData: {
                                    password: newPassword,
                                },
                            }
                        )

                        if (updatedPassword.success) {
                            setSuccess("User successfully updated.")
                            setEdit(true)
                            updatePassword = false
                        } else {
                            setError((err) => {
                                return {
                                    ...err,
                                    signupErr: updatedPassword.message,
                                }
                            })
                            setEdit(true)
                            updatePassword = false
                        }
                    }

                    if (error.oldPassword === "") {
                        var updatedUser = await updateEstablishment({
                            establishmentId,
                            updateData: updateData,
                        })
                        if (updatedUser.success) {
                            setSuccess("Establishment successfully updated.")
                            setEdit(true)
                        } else {
                            setError((err) => {
                                return {
                                    ...err,
                                    signupErr: updatedUser.message,
                                }
                            })
                            setEdit(true)
                        }
                    }
                    setDisable(false)
                } catch (error) {
                    setError((err) => {
                        return {
                            ...err,
                            signupErr: "Failed to update establishment.",
                        }
                    })
                    setDisable(false)
                }
            } else {
                setDisable(false)
            }
        }
    }

    const handleError = async () => {
        var noError = true
        if (establishmentName === "") {
            setError((err) => {
                return {
                    ...err,
                    establishmentName: "Establishment Name is required.",
                }
            })
            noError = false
        }
        if (contactNumber === "") {
            setError((err) => {
                return { ...err, contactNumber: "Contact no. is required." }
            })
            noError = false
        }
        if (barangay === "") {
            setError((err) => {
                return { ...err, barangay: "Barangay is required." }
            })
            noError = false
        }
        if (city === "") {
            setError((err) => {
                return { ...err, city: "City/Municipality is required." }
            })
            noError = false
        }
        if (province === "") {
            setError((err) => {
                return { ...err, province: "Province is required." }
            })
            noError = false
        }
        if (email === "") {
            setError((err) => {
                return { ...err, email: "Email is required." }
            })
            noError = false
        } else {
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(String(email).toLowerCase())) {
                setError((err) => {
                    return { ...err, email: "" }
                })
            } else {
                setError((err) => {
                    return { ...err, email: "Invalid email." }
                })
                noError = false
            }
        }
        if (oldPassword !== "" || newPassword !== "") {
            if (oldPassword.length > 0 && oldPassword.length < 8) {
                setError((err) => {
                    return {
                        ...err,
                        oldPassword:
                            "Old Password should be greater than 8 characters.",
                    }
                })
                noError = false
            }

            if (oldPassword.length >= 8) {
                var matched = await passwordMatched(
                    establishmentId,
                    oldPassword
                )

                if (matched.success) {
                    updatePassword = true
                } else {
                    setError((err) => {
                        return {
                            ...err,
                            oldPassword: matched.message,
                        }
                    })
                    noError = false
                }
            }

            if (newPassword === "") {
                setError((err) => {
                    return {
                        ...err,
                        newPassword: "New Password is required.",
                    }
                })
                noError = false
                updatePassword = false
            } else if (newPassword.length > 0 && newPassword.length < 8) {
                setError((err) => {
                    return {
                        ...err,
                        newPassword:
                            "New Password should be greater than 8 characters.",
                    }
                })
                noError = false
                updatePassword = false
            }
        }
        return noError
    }
    if (!logged) {
        return <Redirect to="/establishment/login" />
    } else {
        return (
            <>
                <div style={{ paddingTop: "70px" }}>
                    <div className="individual-profile content d-flex align-items-center py-4 mb-4">
                        <div className="container">
                            <div className="card p-4">
                                <div className="row">
                                    <div className="col-md-12 contents">
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-8">
                                                <div className="profile-title mb-4 text-center">
                                                    <h2>
                                                        Establishment
                                                        Information
                                                    </h2>
                                                    <h5>{establishmentId}</h5>
                                                </div>
                                                <form
                                                    onSubmit={handleSubmit}
                                                    className="profile-form"
                                                >
                                                    <div className="form-group first">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="establishmentName"
                                                            placeholder="Establishment Name"
                                                            value={
                                                                establishmentName
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {
                                                                error.establishmentName
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="form-group first">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="contactNumber"
                                                            placeholder="Contact No."
                                                            value={
                                                                contactNumber
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {
                                                                error.contactNumber
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="form-group first">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="street"
                                                            placeholder="Street/Subdivision (Optional)"
                                                            value={street}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {error.street}
                                                        </p>
                                                    </div>
                                                    <div className="form-group first">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="barangay"
                                                            placeholder="Barangay"
                                                            value={barangay}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {error.barangay}
                                                        </p>
                                                    </div>
                                                    <div className="form-group first">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="city"
                                                            placeholder="City/Municipality"
                                                            value={city}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {error.city}
                                                        </p>
                                                    </div>
                                                    <div className="form-group first">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="province"
                                                            placeholder="Province"
                                                            value={province}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {error.province}
                                                        </p>
                                                    </div>
                                                    <div className="form-group first">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {error.email}
                                                        </p>
                                                    </div>
                                                    <h6 className="mb-3 text-danger">
                                                        Leave Old Password and
                                                        New Password fields
                                                        blank if you do not want
                                                        to change your current
                                                        password.
                                                    </h6>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="oldPassword"
                                                            placeholder="Old Password"
                                                            value={oldPassword}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {error.oldPassword}
                                                        </p>
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className={`form-control ${
                                                                edit
                                                                    ? ""
                                                                    : "input-active"
                                                            }`}
                                                            id="newPassword"
                                                            placeholder="New Password"
                                                            value={newPassword}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={edit}
                                                        />
                                                        <p className="text-danger">
                                                            {error.newPassword}
                                                        </p>
                                                    </div>
                                                    <p className="text-danger">
                                                        {error.signupErr}
                                                    </p>
                                                    <p className="text-success">
                                                        {success}
                                                    </p>
                                                    <div className="profile-btn">
                                                        <div className="btn-wrapper d-flex justify-content-end">
                                                            <input
                                                                type="button"
                                                                value={
                                                                    edit
                                                                        ? "Edit"
                                                                        : "Cancel"
                                                                }
                                                                onClick={() => {
                                                                    setEdit(
                                                                        !edit
                                                                    )
                                                                }}
                                                                className={`btn ${
                                                                    edit
                                                                        ? "btn-warning"
                                                                        : "btn-danger"
                                                                } mx-2`}
                                                            />
                                                            <input
                                                                type="submit"
                                                                value={
                                                                    !disable
                                                                        ? "Save"
                                                                        : "Loading..."
                                                                }
                                                                className="btn btn-primary ml-2"
                                                                disabled={
                                                                    disable
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfileEstablishment
