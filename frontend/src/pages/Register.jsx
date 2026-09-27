import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);
            toast.success(response.data.message);
            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.errors?.[0]?.message ||
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    const onError = (errors) => {
        const firstError = Object.values(errors)[0];
        toast.error(firstError.message);
    }
    return (
        <div className="register-page">

            <div className="register-brand">

                <p className="register-brand-title">
                    AURELLE
                </p>

                <h1 className="register-brand-heading">
                    Defined by Elegance
                </h1>

                <p className="register-brand-description">
                    Discover timeless pieces designed
                    for simplicity, confidence and refined style.
                </p>

            </div>

            <div className="register-content">

                <p className="register-small-title">
                    JOIN AURELLE
                </p>

                <h2 className="register-heading">
                    Create Your Account
                </h2>

                <p className="register-description">
                    Create an account to explore the AURELLE collection.
                </p>

                <form className="register-form" onSubmit={handleSubmit(onSubmit, onError)}>

                    <div className="register-form-group">

                        <label
                            className="register-label"
                            htmlFor="name"
                        >
                            Name
                        </label>

                        <input
                            className="register-input"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: "Name is required"
                            })}
                        />



                    </div>

                    <div className="register-form-group">

                        <label
                            className="register-label"
                            htmlFor="email"
                        >
                            Email
                        </label>

                        <input
                            className="register-input"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email"
                                }
                            })}
                        />


                    </div>

                    <div className="register-form-group">

                        <label
                            className="register-label"
                            htmlFor="password"
                        >
                            Password
                        </label>

                        <input
                            className="register-input"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                        />

                    </div>
                    <div className="register-form-group">

                        <label
                            className="register-label"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>

                        <input
                            className="register-input"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value, formValues) =>
                                    (value === formValues.password || "Password and confirm password are not matching")
                            })}
                        />

                    </div>

                    <button
                        className="register-button"
                        type="submit"
                    >
                        Create Account
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Register;