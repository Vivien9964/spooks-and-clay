import { useState } from "react"
import { Link } from "react-router-dom"

import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { buttonClasses } from "@/components/ui/buttonStyles"
import { useAdminProducts } from "@/hooks/useAdminProducts"
import { hideProduct, updateProduct, toProductRequest } from "@/services/adminProducts"
import { ApiError } from "@/services/http"
import { imageUrl } from "@/utils/images"
import { effectivePrice, formatLei } from "@/utils/price"
import { isAvailable } from "@/utils/availability"
import type { Product } from "@/types/product"


type ProductStatus = "Live" | "Sold" | "Hidden"

const statusVariant: Record<ProductStatus, "positive" | "neutral" | "warning"> = {
    Live: "positive",
    Sold: "neutral",
    Hidden: "warning",
}


function getStatus(product: Product): ProductStatus {
    if (!product.isActive) return "Hidden"
    return isAvailable(product) ? "Live" : "Sold"
}


function AdminProductsPage() {
    const { products, loadingStatus, errors, refetch } = useAdminProducts()
    const [ busyId, setBusyId ] = useState<number | null>(null)
    const [ actionError, setActionError ] = useState<string | null>(null)


    async function handleVisibility(product: Product) {
        if (product.isActive && !window.confirm(`Hide "${product.name}" from the shop?`)) return

        setBusyId(product.id)
        setActionError(null)

        try {
            if (product.isActive) {
                await hideProduct(product.id)
            } else {
                await updateProduct(product.id, { ...toProductRequest(product), active: true })
            }
            refetch()
        } catch (error) {
            setActionError(error instanceof ApiError && error.status === 400
                ? `"${product.name}" is missing required details. Fill them in with Edit first.`
                : `Couldn't update "${product.name}". Please try again.`)
        } finally {
            setBusyId(null)
        }
    }


    return (
        <section className="max-w-5xl">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-heading font-semibold text-2xl text-bark-900">Products</h1>
                    {loadingStatus === "success" && (
                        <p className="text-sm text-bark-700">{products.length} products</p>
                    )}
                </div>
                <Link to="/admin/products/new" className={buttonClasses("primary", undefined, "sm")}>
                    New product
                </Link>
            </div>

            {actionError && (
                <p role="alert" className="mb-4 rounded-2xl bg-cream-200 px-4 py-3 text-sm text-berry-700">
                    {actionError}
                </p>
            )}

            {loadingStatus === "loading" && products.length === 0 && (
                <p role="status" className="text-bark-700">Loading products...</p>
            )}

            {loadingStatus === "error" && (
                <div role="alert" className="flex flex-wrap items-center gap-3 text-bark-700">
                    <p>{errors}</p>
                    <Button variant="secondary" size="sm" onClick={refetch}>Try again</Button>
                </div>
            )}

            {loadingStatus === "success" && products.length === 0 && (
                <p className="text-bark-700">No products yet.</p>
            )}

            {products.length > 0 && (
                <div className="overflow-x-auto rounded-2xl bg-cream-50 shadow-soft">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-cream-300 text-bark-700">
                            <tr>
                                <th scope="col" className="p-3"><span className="sr-only">Photo</span></th>
                                <th scope="col" className="p-3">Name</th>
                                <th scope="col" className="p-3">Price</th>
                                <th scope="col" className="p-3">Stock</th>
                                <th scope="col" className="p-3">Status</th>
                                <th scope="col" className="p-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                const status = getStatus(product)
                                const image = product.images[0]

                                return (
                                    <tr key={product.id} className="border-b border-cream-200 last:border-0">
                                        <td className="p-3">
                                            {image && (
                                                <img
                                                    src={imageUrl(image.src, 96)}
                                                    alt=""
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <p className="font-bold text-bark-900">{product.name}</p>
                                            <p className="text-xs text-bark-700">/{product.slug}</p>
                                        </td>
                                        <td className="p-3 whitespace-nowrap text-bark-900">
                                            {formatLei(effectivePrice(product))}
                                            {product.isOnSale && (
                                                <Badge variant="sale" className="ml-2">-{product.discountPercent}%</Badge>
                                            )}
                                        </td>
                                        <td className="p-3 text-bark-900">{product.stockCount}</td>
                                        <td className="p-3">
                                            <Badge variant={statusVariant[status]}>{status}</Badge>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    to={`/admin/products/${product.id}/edit`}
                                                    className={buttonClasses("secondary", undefined, "sm")}
                                                    aria-label={`Edit ${product.name}`}
                                                >
                                                    Edit
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={busyId === product.id}
                                                    onClick={() => handleVisibility(product)}
                                                    aria-label={`${product.isActive ? "Hide" : "Show"} ${product.name}`}
                                                >
                                                    {product.isActive ? "Hide" : "Show"}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}

export default AdminProductsPage