import express from "express";
import router from "./router";
import { connectBD } from "./config/db";
const app = express();

connectBD();
// read data from form
app.use(express.json());

// use to map every request for the one to use
app.use("/", router);

export default app;
