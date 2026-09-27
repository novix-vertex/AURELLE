import { useEffect, useState } from "react"
import { getProducts } from "../api/productApi"

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                console.log(response.data);

                setProducts(response.data.data.products);

            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();

    }, []);
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

                <p>
                    {products?.length} products found.
                </p>
            </div>

        </div>
    );
}

export default Products;