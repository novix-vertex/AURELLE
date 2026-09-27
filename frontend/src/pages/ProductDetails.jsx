import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getProduct } from "../api/productApi";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                console.log(response.data.data);
                setProduct(response.data.data.product);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProduct();
    }, [id]);
    return (
        <div className="product-details">
            {product && (
                <div className="product-details-content">

                    <div className="product-images">

                        {product.images.map((image) => (
                            <img
                                key={image.fileId}
                                src={image.url}
                                alt={product.name}
                            />
                        ))}

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