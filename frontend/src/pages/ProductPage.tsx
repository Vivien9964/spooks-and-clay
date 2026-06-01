
import { useParams } from "react-router-dom"
import { products } from "@/data/products"


function ProductPage() {

    const { slug } = useParams<{ slug: string}>()

    const product = products.find((product) => product.slug === slug);

    if(!product) {
        return <h1>Product not found!</h1>
    }

    return (
        <h1>{product.name}</h1>
    )
}

export default ProductPage;