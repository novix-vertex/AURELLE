import { createBrowserRouter } from "react-router"
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";

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
            }
        ]
    }
]);

export default router;