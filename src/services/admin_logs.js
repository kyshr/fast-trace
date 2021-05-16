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
