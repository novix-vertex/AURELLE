import { Link } from "react-router"
function Product({ product }) {

    return (
        <Link
            to={`/products/${product._id}`}
            className="product">

            {product.images.length > 0 && (
                <img
                    className="product-image"
                    src={product.images[0].url}
                    alt={product.name}
                />
            )}

            <div className="product-info">

                <p className="product-category">
                    {product.category}
                </p>

                <h2 className="product-name">
                    {product.name}
                </h2>

                <p className="product-price">
                    ₹{product.price}
                </p>

            </div>

        </Link>
    );
}

export default Product;