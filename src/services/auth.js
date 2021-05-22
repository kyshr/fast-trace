import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "https://vtrace-backend.herokuapp.com/api",
})

//Individual Authentication

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
export async function updateIndividual(data) {
    try {
        const response = await api.put("/users/update", data)
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function updateIndividualPassword(data) {
    try {
        const response = await api.put("/users/update-password", data)
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
        console.log(response)
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

export async function passwordMatched(userId, password) {
    try {
        const response = await api.post("/users/password-matched", {
            userId: userId,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}
