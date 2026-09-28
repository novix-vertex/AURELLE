import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getProduct } from "../api/productApi"
import toast from "react-hot-toast"

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                const productData = response.data.data.product;
                setProduct(productData);
                if (productData.images?.length > 0) {
                    setSelectedImage(productData.images[0].url);
                }
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Failed to load product data"
                );
            } finally {
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

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
        <div className="product-details">
            {product && (
                <div className="product-details-content">

                    <div className="product-images">

                        <div className="product-thumbnails">

                            {product.images.map((image) => (
                                <button
                                    className={`product-thumbnail ${selectedImage === image.url ? "active" : ""}`}
                                    key={image.fileId}
                                    onClick={() => setSelectedImage(image.url)}
                                >
                                    <img
                                        src={`${image.url}?tr=w-150,h-150`}
                                        alt={product.name}
                                    />
                                </button>
                            ))}

                        </div>
                        <div className="product-main-image">
                            <img
                                src={selectedImage || product.images[0]?.url}
                                alt={product.name}
                            />
                        </div>


                    </div>

                    <div className="product-information">

                        <p className="product-category">
                            {product.category}
                        </p>

                        <h1 className="product-name">
                            {product.name}
                        </h1>

                        <p className="product-description">
                            {product.description}
                        </p>

                        <p className="product-price">
                            ₹{product.price}
                        </p>

                        <p className="product-size">
                            Size: {product.size}
                        </p>

                        <p className="product-stock">
                            {product.stock} available
                        </p>
                        <div className="product-quantity">

                            <button
                                onClick={() => setQuantity(quantity - 1)}
                                disabled={quantity === 1}
                            >
                                -
                            </button>

                            <span>{quantity}</span>

                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                disabled={quantity === product.stock}
                            >
                                +
                            </button>

                        </div>

                        <button className="add-to-cart-btn">
                            Add to Cart
                        </button>

                    </div>

                </div>
            )}

        </div>
    )
}

export default ProductDetails