import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api",
})

//Establisment Authentication

export async function getEstablishment(establishmentId) {
    try {
        const response = await api.post("/establishments/individual", {
            establishmentId: establishmentId,
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
        const response = await api.put("/establishments/update", data)
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function updateEstablishmentPassword(data) {
    try {
        const response = await api.put("/establishments/update-password", data)
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to create user." }
    }
}

export async function establishmentLogin(establishmentId, password) {
    try {
        const response = await api.post("/establishments/login", {
            establishmentId: establishmentId,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function checkEstablishmentLoggedIn(establishmentId, password) {
    try {
        const response = await api.post("/establishments/login", {
            establishmentId: establishmentId,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}

export async function estabalishmentLogout() {
    try {
        await api.get("/establishments/logout")
    } catch (error) {
        console.error(error)
    }
}

export async function passwordMatched(establishmentId, password) {
    try {
        const response = await api.post("/establishments/password-matched", {
            establishmentId: establishmentId,
            password: password,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to login." }
    }
}
