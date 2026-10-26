import type { CategoryFilter, SortOrder } from "@/types/product"

import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Search } from "lucide-react"
import clsx from "clsx"
import { useProducts } from "@/hooks/useProducts"
import { useIsSlow } from "@/hooks/useIsSlow"
import { categoryLabels } from "@/data/categories"

import ProductCard from "@/features/products/ProductCard"
import Button from "@/components/ui/Button"
import ProductCardSkeleton from "@/features/products/ProductCardSkeleton"
import SlowLoadNotice from "@/components/SlowLoadNotice"


function ShopPage() {

    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ searchTerm, setSearchTerm ] = useState("");
    const selectedCategory = (searchParams.get("category") ?? "all") as CategoryFilter
    const sortOrder = (searchParams.get("sort") ?? "default") as SortOrder

    const { productCategories, sortedProducts, loadingStatus, errors, refetch } = useProducts({ searchTerm, selectedCategory, sortOrder})
    const isSlow = useIsSlow(loadingStatus === "loading")


    const onSaleCount = sortedProducts.filter(p => p.isOnSale).length

    const setParam = (key: string, value: string, defaultValue: string) => {
        setSearchParams((prev) => {
            if(value === defaultValue) {
                prev.delete(key)
            } else {
                prev.set(key, value)
            }

            return prev
        })
    }

    const chips = [{ value: "all", label: "All" }, ...productCategories.map((category) => ({ value: category, label: categoryLabels[category] ?? category }))]

    return (
        <div className="flex flex-col">

            <div className="w-full bg-cream-100">
                <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-14 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-display text-6xl md:text-7xl text-bark-900">Shop</h1>
                        <p className="font-body text-base text-bark-700">
                            {sortedProducts.length} {sortedProducts.length === 1 ? "creature" : "creatures"}
                            {onSaleCount > 0 && <span className="text-berry-500 font-medium"> · {onSaleCount} on sale</span>}
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-bark-500" />
                        <input
                            type="search"
                            placeholder="Search the spooks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search products"
                            className="w-full font-body text-base text-bark-900 placeholder:text-bark-500 bg-cream-50 rounded-full pl-11 pr-4 py-2.5 shadow-soft focus:outline-none focus:ring-2 focus:ring-pumpkin-500 transition-shadow duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* Sticky filter bar: chips scroll sideways on small screens */}
            <div className="sticky top-[68px] z-30 w-full bg-cream-100/95 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
                    <div role="group" aria-label="Filter by category" className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 py-1">
                        {chips.map((chip) => {
                            const isActive = selectedCategory === chip.value
                            return (
                                <button
                                    key={chip.value}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => setParam("category", chip.value, "all")}
                                    className={clsx(
                                        "shrink-0 px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-700",
                                        isActive
                                            ? "bg-bark-900 text-cream-50 shadow-soft"
                                            : "bg-cream-50 text-bark-700 shadow-soft hover:bg-honey-100 hover:text-bark-900"
                                    )}
                                >
                                    {chip.label}
                                </button>
                            )
                        })}
                    </div>

                    <label className="shrink-0 flex items-center gap-2 font-body text-sm text-bark-700">
                        <span className="hidden sm:inline">Sort</span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setParam("sort", e.target.value, "default")}
                            aria-label="Sort products"
                            className="font-body text-sm text-bark-900 bg-cream-50 rounded-full pl-3 pr-2 py-1.5 shadow-soft cursor-pointer focus:outline-none focus:ring-2 focus:ring-pumpkin-500"
                        >
                            <option value="default">Featured</option>
                            <option value="price-low">Price: low to high</option>
                            <option value="price-high">Price: high to low</option>
                        </select>
                    </label>
                </div>
            </div>

           <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 w-full">

                {loadingStatus === "loading" ? (
                    <>
                        {isSlow && <SlowLoadNotice className="mb-8" />}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    </>
                ) : loadingStatus === "error" ? (
                    <div className="bg-cream-50 rounded-[2rem] shadow-soft p-12 md:p-16 flex flex-col items-center gap-4 text-center">
                        <h2 className="font-heading text-2xl font-semibold text-bark-900">The spooks are hiding right now.</h2>
                        <p className="font-body text-base text-bark-700">{errors ?? "Something went wrong. Please try again."}</p>
                        <Button variant="primary" onClick={refetch}>Try again</Button>
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="bg-cream-50 rounded-[2rem] shadow-soft p-12 md:p-16 flex flex-col items-center gap-4 text-center">
                        <h2 className="font-heading text-2xl font-semibold text-bark-900">No spooks found.</h2>
                        <p className="font-body text-base text-bark-700">Try a different search, or clear the filter.</p>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSearchTerm("")
                                setParam("category", "all", "all")
                            }}
                        >
                            Clear search and filter
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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