import express from "express";
import configService from "./src/config/config.service.js";
import { errHandler } from "./src/common/index.js";
import { connectDB } from "./src/db/connection.js";
import { userRouter, noteRouter } from "./src/module/index.js";

let port = configService.port;
const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/notes', noteRouter);

await connectDB();


app.use("/*dummy", (req, res) => {
    res.status(404).json({
        message: "Route not found",
        route: req.params.dummy,
        method: req.method
    });
});
app.use(errHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

