import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import productRoute from "./routes/productRoute";
import morgan from "morgan";

dotenv.config();
app.use(morgan("common"));

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(helmet());

app.use(express.json());

// Serve other routes
app.use("/api/v1/products/", productRoute);

// Start backend server
const PORT = process.env.PORT || 8100;

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

export default app;
