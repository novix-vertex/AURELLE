import app from "./src/app.js"
import { config } from "./src/config/config.js"
import connectToDB from "./src/config/db.js";

const PORT = config.PORT_NO || 5000;

/**
 * Globally await can be used without explicit async
 */
await connectToDB();

app.listen(PORT, () => {
    console.log("Server running on port no.", config.PORT_NO);
});
