import { useEffect, useState } from "react"
import { getProducts } from "../api/productApi"
import Product from "../components/Product";
import toast from "react-hot-toast"
const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data.data.products);

            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Failed to load products"
                );
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();

    }, []);
    if (isLoading) {
        return (
            <div className="loading">
                <span className="loading-text">
                    Loading...
                </span>
            </div>
        );
    }
    return (
        <div className="products-page">

            <div className="products-header">

                <p className="small-title">
                    AURELLE COLLECTION
                </p>

                <h1 className="title">Discover Your Style</h1>

                <p className="description">
                    Explore carefully selected pieces designed
                    for timeless elegance.
                </p>

            </div>

            <div className="products-list">

                {products.map((product) => (
                    <Product
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

        </div>
    );
}

export default Products;