//Main starting point
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./router";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

//Db setup
mongoose.connect("mongodb://localhost:27017/auth");

//App setup

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on port", port);
