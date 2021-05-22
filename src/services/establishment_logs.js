import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "https://vtrace-backend.herokuapp.com/api",
})

export async function getEstablishmentLogsByDate(establishmentId, dateTime) {
    try {
        const response = await api.post("/logs/establishment-logs", {
            establishmentId: establishmentId,
            dateTime: dateTime,
        })
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Failed to get establishment logs." }
    }
}
