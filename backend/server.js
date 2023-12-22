const express = require("express");
const dotenv = require("dotenv").config();
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

const goalsRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", [goalsRouter, errorHandler]);
app.use("/api/users", [userRouter, errorHandler]);

//for production purposes
if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "..frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html"));
    });
}

app.listen(port, () => console.log("Server is listening on port " + port));