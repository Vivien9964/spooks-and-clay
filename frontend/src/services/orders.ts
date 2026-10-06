import type { Order, OrderItem, OrderStatus } from "@/types/order"
import type { OrderDto, OrderItemDto, OrderStatusDto, Page } from "@/types/api"
import { http } from "@/services/http"


const statusMap: Record<OrderStatusDto, OrderStatus> = {
    PENDING: "pending",
    PAID: "paid",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled"
}

export async function getMyOrders(userId: number) : Promise<Order[]> {

    const res = await http<Page<OrderDto>>(`/orders?userId=${userId}&size=50&sort=createdAt,desc`)
    return res.content.map((order) => toOrder(order))
}


export function toOrder(dto: OrderDto): Order {

    return {
        id: dto.id,
        userId: dto.userId,
        status: statusMap[dto.status],
        orderedAt: dto.createdAt,
        items: dto.items.map((item) => toOrderItem(item))
    }
}


function toOrderItem(dto: OrderItemDto): OrderItem {
    return {
        productId: dto.productId,
        productName: dto.productName,
        unitPrice: Number(dto.price),
        quantity: dto.quantity
    }
}
