import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api",
})

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

export async function individualLogout() {
    try {
        const response = await api.get("/users/logout")
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
