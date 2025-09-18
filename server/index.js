import { config } from "dotenv";
import { app } from "./src/app.js";
config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server is listening on port: ', PORT));