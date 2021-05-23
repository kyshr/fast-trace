import axios from "axios"

const api = axios.create({
    baseURL: "https://vtrace-backend.herokuapp.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

//Individual Authentication

export async function getIndividual(userId) {
    try {
        const response = await api({
            url: "/users/individual",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceToken"),
            },
            data: { userId: userId },
        })
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
        const response = await api({
            url: "/users/update",
            method: "put",
            headers: {
                auth_token: localStorage.getItem("vtraceToken"),
            },
            data: data,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function updateIndividualPassword(data) {
    try {
        const response = await api({
            url: "/users/update-password",
            method: "put",
            headers: {
                auth_token: localStorage.getItem("vtraceToken"),
            },
            data: data,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function individualLogin(userId, password) {
    try {
        const response = await api({
            url: "/users/login",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceToken"),
            },
            data: { userId: userId, password: password },
        })
        if (response.data.success) {
            localStorage.setItem("vtraceToken", response.data.token)
        }
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function checkIndividualLoggedIn(userId, password) {
    try {
        const response = await api({
            url: "/users/login",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceToken"),
            },
            data: { userId: userId, password: password },
        })

        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function individualLogout() {
    try {
        await localStorage.removeItem("vtraceToken")
        // await api.get("/users/logout")
    } catch (error) {
        console.error(error)
    }
}

export async function passwordMatched(userId, password) {
    try {
        const response = await api({
            url: "/users/password-matched",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceToken"),
            },
            data: { userId: userId, password: password },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}
