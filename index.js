// Import packages
const express = require("express");
const home = require("./src/routes/home");
import configViewEngine from "./src/configs/viewEngine";
// import initWebRoutes from "./src/routes/web";
import connectDB from "./src/configs/connectDB";
// Middlewares
const app = express();
app.use(express.json());
configViewEngine(app);
// //init web route (dieu huong website)
// initWebRoutes(app);
// //connectDatabase
connectDB();
// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
