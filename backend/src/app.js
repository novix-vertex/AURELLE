import express from "express"

const app = express();
app.use(express.json());

/**
 * For testing purpose to check if server is responding or not
 */
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to AURELLE"
    });
})


export default app;