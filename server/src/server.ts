import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
dotenv.config();
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder


const distPath = path.join(__dirname, "../client/dist");
app.use(express.static(distPath));

app.get ("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});
// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/data", (req, res) => {
    console.log("Received Data:", req.body);
    res.json({message: "Data recieved successfully", data: req.body});
});


// TODO: Implement middleware to connect the routes
app.use(routes);
const router = express.Router();

router.get("/forecast", (_req, res) => {
    res.json({message: "Weather forecast data will be here." });
});

router.get("/current", (_req, res) => {
    res.json({ message: "Current weather data will be here." });
});

export default router;

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
