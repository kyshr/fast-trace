import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api",
})

//Establisment Authentication

export async function getAdminLogs() {
    try {
        const response = await api.get("/admin/admin-logs")
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}
export async function getAdminList() {
    try {
        const response = await api.get("/admin/admin-list")
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function createAdmin(password) {
    try {
        const response = await api.post("/admin/create", {
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function updateAdmin(username, password) {
    try {
        const response = await api.post("/admin/update", {
            editUsername: username,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function getScanCount() {
    try {
        const response = await api.post("/admin/admin-scan-count", {
            dateTime: new Date().toISOString(),
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function getAdminUserLogs(date, match) {
    try {
        const response = await api.post("/admin/admin-user-logs", {
            dateTime: new Date(date).toISOString(),
            match: match,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}

export async function getEstablishments(match) {
    try {
        const response = await api.post("/admin/admin-establishments", {
            match: match,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "No recent logins." }
    }
}
