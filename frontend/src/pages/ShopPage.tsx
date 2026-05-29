import { products } from "@/data/products"

import ProductCard from "@/features/products/ProductCard"


function ShopPage() {

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ShopPage;