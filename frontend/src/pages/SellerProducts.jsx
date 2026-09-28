import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import { getSellerProducts, updateProductStatus, deleteProduct } from "../api/productApi"

const SellerProducts = () => {
    const { accessToken, isLoading: authLoading } = useAuth();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authLoading || !accessToken) {
            return;
        }
        const fetchProducts = async () => {
            try {
                const response = await getSellerProducts(accessToken);

                setProducts(response.data.data.products);

            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Failed to load products"
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [accessToken, authLoading]);

    const handleStatusChange = async (id, isActive) => {
        try {
            await updateProductStatus(id, !isActive, accessToken);

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id
                        ? {
                            ...product,
                            isActive: !isActive
                        }
                        : product
                )
            );

            toast.success(!isActive ? "Product activated" : "Product deactivated");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update product");
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteProduct(id, accessToken);

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== id)
            );

            toast.success("Product deleted");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="seller-products">
            <h1>Manage Products</h1>

            {products.map((product) => (
                <div
                    className="seller-product"
                    key={product._id}
                >
                    <img
                        src={product.images[0]?.url}
                        alt={product.name}
                    />

                    <div>
                        <h2>{product.name}</h2>
                        <p>₹{product.price}</p>

                        <p>
                            {product.isActive ? "Active" : "Inactive"}
                        </p>
                    </div>

                    <button
                        onClick={
                            () => handleStatusChange(product._id, product.isActive)
                        }
                    >
                        {product.isActive ? "Deactivate" : "Activate"}
                    </button>

                    <button
                        onClick={
                            () => handleDelete(product._id)
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SellerProducts;