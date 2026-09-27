import { createBrowserRouter } from "react-router"
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";

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
            }
        ]
    }
]);

export default router;