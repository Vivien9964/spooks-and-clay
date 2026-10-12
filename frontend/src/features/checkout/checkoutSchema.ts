
import { z } from "zod"


export const checkoutSchema = z.object({
    
    recipientName: z.string().trim().min(1, "Recipient name is required!").max(255),
    street: z.string().trim().min(1, "Street address is required!").max(255),
    city: z.string().trim().min(1, "City is required!").max(255),
    region: z.string().trim().max(255).optional(),
    postalCode: z.string().trim().min(1, "Postal code is required!").max(255),
    country: z.string().trim().min(1, "Country is required!").max(255),
    phone: z.string().trim().min(1, "Phone number is required!").max(255),

})

export type CheckoutValues = z.infer<typeof checkoutSchema>
