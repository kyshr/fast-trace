import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api",
})

//Establisment Authentication

export async function getAdmin(username) {
    try {
        const response = await api.post("/admin/individual", {
            username: username,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create admin." }
    }
}

export async function createAdmin(data) {
    try {
        const response = await api.post("/admin/create", data)
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create admin." }
    }
}

export async function adminLogin(username, password) {
    try {
        const response = await api.post("/admin/login", {
            username: username,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function checkAdminLoggedIn(username, password) {
    try {
        const response = await api.post("/admin/login", {
            username: username,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function adminLogout() {
    try {
        await api.get("/admin/logout")
    } catch (error) {
        console.error(error)
    }
}
