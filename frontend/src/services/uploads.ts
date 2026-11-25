import type { UploadTicketDto } from "@/types/api"
import { http } from "@/services/http"

type UploadResponse = {
    secure_url: string;
}


export async function uploadImage(file: File): Promise<string> {
    const ticket = await http<UploadTicketDto>("/images/upload-ticket", { method: "POST" })

    const form = new FormData()
    Object.entries(ticket.fields).forEach(([key, value]) => form.append(key, value))
    form.append("file", file)

    const res = await fetch(ticket.uploadUrl, { method: "POST", body: form})

    if(!res.ok) {
        throw new Error(`Image upload failed with status ${res.status}`)
    }

    const data = (await res.json()) as UploadResponse

    return data.secure_url
}