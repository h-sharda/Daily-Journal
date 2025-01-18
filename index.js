const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user");
const { checkCookie } = require("./middlewares/authentication");

require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = 8000;

mongoose.connect(MONGO_URI).then(e => console.log("Mongo Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkCookie("token"));

app.get('/', (req, res) => {
    res.render("home", {
        user: req.user,
    });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log( `Server started at PORT: http://localhost:${PORT}`));
