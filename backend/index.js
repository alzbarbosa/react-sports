const express = require('express')
const dotenv = require('dotenv').config()
//const {createError} = require('./middleware/createErrorMiddleware')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoute = require("./routes/authRoutes")
const placesRoute = require("./routes/placesRoutes")
const connectDB = require('./config/db')

const port = process.env.PORT || 8000

const app = express();

connectDB()

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded( {extended: false}))

app.use("/api/auth", authRoute);
app.use("/api/places", placesRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`))

/*
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
*/