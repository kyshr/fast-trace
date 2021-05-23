import axios from "axios"

const api = axios.create({
    baseURL: "https://vtrace-backend.herokuapp.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

//Establisment Authentication

export async function getAdmin(username) {
    try {
        const response = await api({
            url: "/admin/individual",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { username: username },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create admin." }
    }
}

export async function createAdmin(data) {
    try {
        const response = await api({
            url: "/admin/create",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { data },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create admin." }
    }
}

export async function adminLogin(username, password) {
    try {
        const response = await api({
            url: "/admin/login",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { username: username, password: password },
        })
        if (response.data.success) {
            localStorage.setItem("vtraceAdminToken", response.data.token)
        }
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function checkAdminLoggedIn(username, password) {
    try {
        const response = await api({
            url: "/admin/login",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { username: username, password: password },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function adminLogout() {
    try {
        await localStorage.removeItem("vtraceAdminToken")
    } catch (error) {
        console.error(error)
    }
}
