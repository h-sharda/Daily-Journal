const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user")

require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = 8000;

mongoose.connect(MONGO_URI).then(e => console.log("Mongo Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log( `Server started at PORT: http://localhost:${PORT}`));
