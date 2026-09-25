import express from "express"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/product.routes.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to AURELLE"
    });
})

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;