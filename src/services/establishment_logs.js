import axios from "axios"

const api = axios.create({
    // baseURL: "https://vtrace-backend.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

export async function getEstablishmentLogsByDate(establishmentId, dateTime) {
    try {
        const response = await api({
            url: "/logs/establishment-logs",
            method: "post",
            headers: {
                auth_token: localStorage.getItem("vtraceEstToken"),
            },
            data: { establishmentId: establishmentId, dateTime: dateTime },
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to get establishment logs." }
    }
}
