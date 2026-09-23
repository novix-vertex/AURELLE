import app from "./src/app.js"
import { config } from "./src/config/config.js"

const PORT = config.PORT_NO || 5000;

app.listen(PORT, () => {
    console.log("Server running on port no.", config.PORT_NO);
});
