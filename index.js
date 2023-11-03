// //Import packages
// const express = require("express");
// const home = require("./src/routes/home");
// const web = require("./src/routes/web")
// // import configViewEngine from "./src/configs/viewEngine";
// // import initWebRoutes from "./src/routes/web";
// // import connectDB from "./src/configs/connectDB";
// // Middlewares
// const app = express();
// app.use(express.json());
// // configViewEngine(app);
// // //init web route (dieu huong website)
// // initWebRoutes(app);
// // //connectDatabase
// // connectDB();
// // Routes\
// app.use("/a",web)
// app.use("/home", home);

// // connection
// const port = process.env.PORT || 9001;
// app.listen(port, () => console.log(`Listening to port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const programmingLanguagesRouter = require('./src/routes/programmingLanguages.route');
const home = require("./src/routes/home");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})
app.use("/home", home);

app.use('/programming-languages', programmingLanguagesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});