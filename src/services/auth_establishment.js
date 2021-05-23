import axios from "axios"

const api = axios.create({
    baseURL: "https://vtrace-backend.herokuapp.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

//Establisment Authentication
export async function getEstablishment(establishmentId) {
    try {
        const response = await api({
            url: "/establishments/individual",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceEstToken"),
            },
            data: { establishmentId: establishmentId },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function createEstablishment(data) {
    try {
        const response = await api.post("/establishments/create", data)
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}
export async function updateEstablishment(data) {
    try {
        const response = await api({
            url: "/establishments/update",
            method: "put",
            headers: {
                auth_token: localStorage.getItem("vtraceEstToken"),
            },
            data: data,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function updateEstablishmentPassword(data) {
    try {
        const response = await api({
            url: "/establishments/update-password",
            method: "put",
            headers: {
                auth_token: localStorage.getItem("vtraceEstToken"),
            },
            data: data,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function establishmentLogin(establishmentId, password) {
    try {
        const response = await api({
            url: "/establishments/login",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceEstToken"),
            },
            data: { establishmentId: establishmentId, password: password },
        })

        if (response.data.success) {
            localStorage.setItem("vtraceEstToken", response.data.token)
        }

        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function checkEstablishmentLoggedIn(establishmentId, password) {
    try {
        const response = await api({
            url: "/establishments/login",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceEstToken"),
            },
            data: { establishmentId: establishmentId, password: password },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function estabalishmentLogout() {
    try {
        await localStorage.removeItem("vtraceEstToken")
    } catch (error) {
        console.error(error)
    }
}

export async function passwordMatched(establishmentId, password) {
    try {
        const response = await api({
            url: "/establishments/password-matched",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceEstToken"),
            },
            data: { establishmentId: establishmentId, password: password },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}
