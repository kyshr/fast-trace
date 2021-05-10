import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api",
})

export async function getIndividual(userId) {
    try {
        const response = await api.post("/users/individual", { userId: userId })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function createIndividual(data) {
    try {
        const response = await api.post("/users/create", data)
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function individualLogin(userId, password) {
    try {
        const response = await api.post("/users/login", {
            userId: userId,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function checkIndividualLoggedIn(userId, password) {
    try {
        const response = await api.post("/users/login", {
            userId: userId,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function individualLogout() {
    try {
        await api.get("/users/logout")
    } catch (error) {
        console.error(error)
    }
}
