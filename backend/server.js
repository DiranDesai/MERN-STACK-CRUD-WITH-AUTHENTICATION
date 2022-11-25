require("express-async-errors");

const express = require("express");
const authRouter = require("./routes/auth");
const goalsRouter = require("./routes/goals");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/error_handler_middleware");

dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", authRouter);
app.use("/api", goalsRouter);

app.use(errorHandler);


app.get("/", (req, res) => {
    res.json({message: "API running"});
});

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_LOCAL_URL);
        console.log("Connected to MONGO database");
    } catch (error) {
        console.log(error);
    }
}


async function runServer() {
    await connectDb();
    app.listen(5000, () => console.log("Server running on port 6000"));
}

runServer();
