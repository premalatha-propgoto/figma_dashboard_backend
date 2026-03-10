import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

app.use(cors({ 
  origin: "http://localhost:3000", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(express.json());
app.use("/api", router);

export default app;