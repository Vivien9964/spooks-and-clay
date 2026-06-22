import type { CategoryFilter, SortOrder } from "@/types/product"

import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useProducts } from "@/hooks/useProducts"
import { categoryLabels } from "@/data/categories"

import ProductCard from "@/features/products/ProductCard"
import ProductCardSkeleton from "@/features/products/ProductCardSkeleton"


function ShopPage() {

    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ searchTerm, setSearchTerm ] = useState("");
    const selectedCategory = (searchParams.get("category") ?? "all") as CategoryFilter
    const sortOrder = (searchParams.get("sort") ?? "default") as SortOrder

    const { productCategories, sortedProducts, loadingStatus, errors } = useProducts({ searchTerm, selectedCategory, sortOrder})


    const onSaleCount = sortedProducts.filter(p => p.isOnSale).length

    return (
        <div className="flex flex-col">

            <div className="w-full bg-cream-200 border-b-2 border-bark-900 py-12">
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
                    <h1 className="font-display text-5xl md:text-6xl text-bark-900">Browse the Hollow</h1>
                    <div className="flex items-center gap-3 w-40">
                        <span className="flex-1 h-px bg-cream-300" />
                        <span className="text-bark-300 text-sm">✦</span>
                        <span className="flex-1 h-px bg-cream-300" />
                    </div>
                    <p className="font-body text-sm text-bark-500">
                        {sortedProducts.length} {sortedProducts.length === 1 ? "creature" : "creatures"}
                        {onSaleCount > 0 && <span className="text-pumpkin-700"> · {onSaleCount} on sale</span>}
                    </p>
                </div>
            </div>

            <div className="w-full bg-cream-50 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search the hollow..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search products"
                        className="flex-1 font-body text-sm text-bark-700 placeholder:text-bark-300 placeholder:italic bg-cream-50 border border-bark-300 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pumpkin-300 focus:border-pumpkin-500 transition-colors duration-200"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            const value = e.target.value
                            setSearchParams((prev) => {
                                if(value === "all") {
                                    prev.delete("category")
                                } else {
                                    prev.set("category", value)
                                }

                                return prev
                            })
                        }}
                        aria-label="Filter by category"
                        className="font-body text-sm text-bark-700 bg-cream-50 border border-bark-300 rounded-sm px-4 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pumpkin-300 focus:border-pumpkin-500 transition-colors duration-200"
                    >
                        <option value="all">All Categories</option>
                        {productCategories.map((category) => (
                            <option key={category} value={category}>{categoryLabels[category] ?? category }</option>
                        ))}
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => {
                            const value = e.target.value
                            setSearchParams((prev) => {
                                if(value === "default") {
                                    prev.delete("sort")
                                } else {
                                    prev.set("sort", value)
                                }
                                
                                return prev
                            })
                        }}
                        aria-label="Sort products"
                        className="font-body text-sm text-bark-700 bg-cream-50 border border-bark-300 rounded-sm px-4 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pumpkin-300 focus:border-pumpkin-500 transition-colors duration-200"
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Low to High</option>
                        <option value="price-high">High to Low</option>
                    </select>
                </div>
            </div>

           <div className="max-w-7xl mx-auto px-4 py-10 w-full">
                {loadingStatus === "loading" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : loadingStatus === "error" ? (
                    <div className="bg-cream-50 border-2 border-bark-900 shadow-[4px_4px_0px_var(--color-bark-900)] rounded-sm p-16 flex flex-col items-center gap-4 text-center">
                        <h2 className="font-display text-2xl text-bark-900">The hollow is unreachable.</h2>
                        <p className="font-body text-sm text-bark-500 italic">{errors ?? "Something went wrong. Please try again."}</p>
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="bg-cream-50 border-2 border-bark-900 shadow-[4px_4px_0px_var(--color-bark-900)] rounded-sm p-16 flex flex-col items-center gap-4 text-center">
                        <h2 className="font-display text-2xl text-bark-900">Nothing stirring in the hollow.</h2>
                        <p className="font-body text-sm text-bark-500 italic">Try a different search, or clear the filter.</p>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="font-body text-sm text-bark-500 hover:text-bark-700 underline underline-offset-4 transition-colors duration-200 cursor-pointer"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default ShopPage;