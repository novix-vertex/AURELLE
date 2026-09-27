import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { loginUser } from "../api/authApi"
const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            console.log(response.data);

            toast.success("Login successful");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    const onError = (errors) => {
        const firstError = Object.values(errors)[0];
        toast.error(firstError.message);
    }

    return (
        <div className="login-page">

            <div className="login-brand">

                <p className="login-brand-title">
                    AURELLE
                </p>

                <h1 className="login-brand-heading">
                    Defined by Elegance
                </h1>

                <p className="login-brand-description">
                    Welcome back to a world of timeless
                    style and refined essentials.
                </p>

            </div>

            <div className="login-content">

                <p className="login-small-title">
                    WELCOME BACK
                </p>

                <h2 className="login-heading">
                    Sign In
                </h2>

                <p className="login-description">
                    Sign in to continue exploring the AURELLE collection.
                </p>

                <form
                    className="login-form"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >

                    <div className="login-form-group">

                        <label
                            className="login-label"
                            htmlFor="email"
                        >
                            Email
                        </label>

                        <input
                            className="login-input"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required"
                            })}
                        />

                    </div>

                    <div className="login-form-group">

                        <label
                            className="login-label"
                            htmlFor="password"
                        >
                            Password
                        </label>

                        <input
                            className="login-input"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />

                    </div>

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Sign In
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;