import axios from "axios"

const api = axios.create({
    baseURL: "https://vtrace-backend.herokuapp.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

export async function getIndividualLogsByDate(userId, dateTime) {
    try {
        const response = await api({
            url: "/logs/individual-logs",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceToken"),
            },
            data: { userId: userId, dateTime: dateTime },
        })

        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to get user logs." }
    }
}
