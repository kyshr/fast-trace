import axios from "axios"

const api = axios.create({
    baseURL: "https://vtrace-backend.herokuapp.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

//Establisment Authentication

export async function getAdminLogs() {
    try {
        const response = await api({
            url: "/admin/admin-logs",
            method: "get",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}
export async function getAdminList() {
    try {
        const response = await api({
            url: "/admin/admin-list",
            method: "get",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function createAdmin(password) {
    try {
        const response = await api({
            url: "/admin/create",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { password: password },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function updateAdmin(username, password) {
    try {
        const response = await api({
            url: "/admin/update",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { editUsername: username, password: password },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function getScanCount() {
    try {
        const response = await api({
            url: "/admin/admin-scan-count",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { dateTime: new Date().toISOString() },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function getAdminUserLogs(date, match) {
    try {
        const response = await api({
            url: "/admin/admin-user-logs",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { dateTime: new Date(date).toISOString(), match: match },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function getEstablishments(match) {
    try {
        const response = await api({
            url: "/admin/admin-establishments",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceAdminToken"),
            },
            data: { match: match },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}
