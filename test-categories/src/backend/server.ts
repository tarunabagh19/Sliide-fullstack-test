// backend/server.ts
import express from "express";
import cors from "cors";
import categoriesRouter from "./api/categories.ts"; 

const app = express();
app.use(cors());
app.use(express.json());

// Mount router
app.use("/api/categories", categoriesRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
