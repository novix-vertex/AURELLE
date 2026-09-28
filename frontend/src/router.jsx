import { createBrowserRouter } from "react-router"
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerProducts from "./pages/SellerProducts";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "products",
                Component: Products
            },
            {
                path: "products/:id",
                Component: ProductDetails
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: "login",
                Component: Login
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "profile",
                        Component: Profile
                    }
                ]
            },
            {
                path: "/seller/products",
                element: <SellerProducts />
            }

        ]
    }
]);

export default router;