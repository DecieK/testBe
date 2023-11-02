// // Import packages
// const express = require("express");
// const home = require("./src/routes/home");
// import configViewEngine from "./src/configs/viewEngine";
// import initWebRoutes from "./src/routes/web";
// // import connectDB from "./src/configs/connectDB";
// // Middlewares
// const app = express();
// app.use(express.json());
// configViewEngine(app);
// // //init web route (dieu huong website)
// initWebRoutes(app);
// // //connectDatabase
// // connectDB();
// // Routes
// app.use("/home", home);

// // connection
// const port = process.env.PORT || 9001;
// app.listen(port, () => console.log(`Listening to port ${port}`));

const express = require("express");
// import express from "express";
import configViewEngine from "./src/configs/viewEngine";
import initWebRoutes from "./src/routes/web";
import connectDB from "./src/configs/connectDB";
import cors from "cors";
import bodyParser from "body-parser";


require("dotenv").config();
const corsConfig = {
  credentials: true,
  origin: true,
}

const app = express();
// app.use(cors(corsConfig));

const port = process.env.PORT || 8080; //backup, .port or 3000

//cauhinh cho phep gui data tu client len phia server; body-parser da tich hop trong express
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//setup viewEngine
configViewEngine(app);
//init web route (dieu huong website)
// initWebRoutes(app);
//connectDatabase
// connectDB();

app.use("/home", home);

app.listen(port, () => {
  console.log(`Backend Nodejs running on port ${port}`);
});
