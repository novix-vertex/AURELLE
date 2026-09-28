import { Form, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createProduct, updateProduct, getProduct } from "../api/productApi";
import toast from "react-hot-toast";

const ProductForm = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    const [isProductLoading, setIsProductLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: product?.name || "",
            description: product?.description || "",
            price: product?.price || "",
            category: product?.category || "",
            size: product?.size || "",
            stock: product?.stock || ""
        }
    });


    useEffect(() => {

        if (!id) {
            return;
        }

        const fetchProduct = async () => {
            setIsProductLoading(true);

            try {

                const response = await getProduct(id);
                setProduct(response.data.data.product);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

                navigate("/seller/products");
            } finally {

                setIsProductLoading(false);
            }
        };

        fetchProduct();

    }, [id, navigate]);

    useEffect(() => {

        if (!product) {
            return;
        }

        reset({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            size: product.size,
            stock: product.stock
        });

    }, [product, reset]);


    const isEdit = Boolean(product);

    const onSubmit = async (data) => {

        try {

            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("category", data.category);
            formData.append("size", data.size);
            formData.append("stock", data.stock);

            if (data.images) {
                Array.from(data.images).forEach((image) => {
                    formData.append("images", image);
                });
            }

            if (isEdit) {

                await updateProduct(
                    product._id,
                    formData,
                    accessToken
                );

                toast.success("Product updated successfully");

            } else {

                await createProduct(
                    formData,
                    accessToken
                );

                toast.success("Product added successfully");
            }

            navigate("/seller/products");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save product"
            );
        }
    };

    if (id && isProductLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="product-form-page">

            <div className="product-form-header">
                <p className="product-form-small-title">
                    AURELLE
                </p>

                <h1>
                    {isEdit ? "Edit Product" : "Add Product"}
                </h1>

                <p className="product-form-description">
                    {isEdit
                        ? "Update the details of your product."
                        : "Add a new product to your collection."}
                </p>
            </div>

            <Form
                className="product-form"
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="product-form-grid">

                    <div className="product-form-group">
                        <label>Product Name</label>

                        <input
                            type="text"
                            placeholder="Enter product name"
                            {...register("name", {
                                required: "Product name is required"
                            })}
                        />

                        {errors.name && (
                            <p className="product-form-error">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="product-form-group">
                        <label>Price</label>

                        <input
                            type="number"
                            placeholder="Enter price"
                            {...register("price", {
                                required: "Price is required"
                            })}
                        />

                        {errors.price && (
                            <p className="product-form-error">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div className="product-form-group">
                        <label>Category</label>

                        <input
                            type="text"
                            placeholder="e.g. Top or Bottom"
                            {...register("category", {
                                required: "Category is required"
                            })}
                        />

                        {errors.category && (
                            <p className="product-form-error">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    <div className="product-form-group">
                        <label>Size</label>

                        <input
                            type="text"
                            placeholder="e.g. M or 32"
                            {...register("size", {
                                required: "Size is required"
                            })}
                        />

                        {errors.size && (
                            <p className="product-form-error">
                                {errors.size.message}
                            </p>
                        )}
                    </div>

                    <div className="product-form-group">
                        <label>Stock</label>

                        <input
                            type="number"
                            placeholder="Enter stock quantity"
                            {...register("stock", {
                                required: "Stock is required"
                            })}
                        />

                        {errors.stock && (
                            <p className="product-form-error">
                                {errors.stock.message}
                            </p>
                        )}
                    </div>

                </div>

                <div className="product-form-group product-form-description-group">
                    <label>Description</label>

                    <textarea
                        placeholder="Enter product description"
                        {...register("description", {
                            required: "Product description is required"
                        })}
                    />

                    {errors.description && (
                        <p className="product-form-error">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="product-form-group">
                    <label>Product Images</label>

                    {product?.images?.length > 0 && (
                        <div className="product-form-existing-images">
                            {product.images.map((image) => (
                                <img
                                    key={image.fileId}
                                    src={image.url}
                                    alt={product.name}
                                />
                            ))}
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        {...register("images")}
                    />
                </div>

                <button
                    className="product-form-button"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : isEdit
                            ? "Update Product"
                            : "Add Product"}
                </button>

            </Form>

        </div>
    );
};

export default ProductForm;