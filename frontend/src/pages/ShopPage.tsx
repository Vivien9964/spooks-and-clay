import type { CategoryFilter, SortOrder } from "@/types/product"
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts"

import ProductCard from "@/features/products/ProductCard"


function ShopPage() {

    const [ searchTerm, setSearchTerm ] = useState("");
    const [ selectedCategory, setSelectedCategory ] = useState<CategoryFilter>("all")
    const [ sortOrder, setSortOrder ] = useState<SortOrder>("default")

    const { productCategories, sortedProducts } = useProducts({ searchTerm, selectedCategory, sortOrder })


    return (
        <div className="max-w-7xl mx-auto px-4 py-12">

            <div className="flex flex-col items-center gap-3 mb-10">
                <h1 className="font-display text-4xl text-bark-900">Shop</h1>
                <div className="flex items-center gap-3 w-40">
                    <span className="flex-1 h-px bg-cream-300" />
                    <span className="text-bark-300 text-sm">✦</span>
                    <span className="flex-1 h-px bg-cream-300" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <input 
                    type="text" 
                    placeholder="Search products..."  
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 font-body text-sm text-bark-700 placeholder:text-bark-300 bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-plum-300 focus:border-plum-500 transition-colors duration-200"
                />

                <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value as CategoryFilter)}
                    className="font-body text-sm text-bark-700 bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-plum-300 focus:border-plum-500 transition-colors duration-200"
                >
                    <option value="all">All Categories</option>
                    { productCategories.map((category) => (
                        <option 
                            key={category}
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>

                <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                    className="font-body text-sm text-bark-700 bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-plum-300 focus:border-plum-500 transition-colors duration-200"
                >
                    <option value="default">Default</option>
                    <option value="price-low">Low to High</option>
                    <option value="price-high">High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ShopPage;