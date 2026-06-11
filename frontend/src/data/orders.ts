import type { Order } from "@/types/order"

export const orders: readonly Order[] = [
    {
        orderId: 1001,
        userId: 1,
        status: "delivered",
        orderedAt: "2025-01-15",
        deliveredAt: "2025-01-22",
        items: [
            { productName: "Pumpkin Familiar", unitPrice: 24, quantity: 2, variant: "Small / Orange" },
            { productName: "Ghostie Tealight Holder", unitPrice: 18, quantity: 1 },
        ],
        shippingAddress: {
            country: "Romania",
            city: "Arad",
            street: "Strada Dunari",
            number: "12",
            postalCode: "315300",
        },
    },
    {
        orderId: 1002,
        userId: 1,
        status: "shipped",
        orderedAt: "2025-02-03",
        items: [
            { productName: "Black Cat Incense Burner", unitPrice: 32, quantity: 1, variant: "Matte Black" },
        ],
        shippingAddress: {
            country: "Romania",
            city: "Arad",
            street: "Strada Dunari",
            number: "12",
            postalCode: "315300",
        },
    },
    {
        orderId: 1003,
        userId: 1,
        status: "pending",
        orderedAt: "2025-02-10",
        items: [
            { productName: "Toadstool Trinket Dish", unitPrice: 15, quantity: 3 },
            { productName: "Crescent Moon Wall Hook", unitPrice: 21, quantity: 1, variant: "Sage" },
        ],
        shippingAddress: {
            country: "Romania",
            city: "Arad",
            street: "Strada Dunari",
            number: "12",
            postalCode: "315300",
        },
    },
]
