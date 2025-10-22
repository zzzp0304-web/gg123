import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import bodyParser from "body-parser";
import http from "http";
import { initialize } from "./controller";
import { connectMongoDB, initialSettings } from "./config";

dotenv.config();

connectMongoDB();

const { creatorFeeAmount, marketCount, decimal, fundFeePercentage, bettingFeePercentage } = initialSettings;
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  ...(process.env.REPLIT_DEV_DOMAIN ? [`https://${process.env.REPLIT_DEV_DOMAIN}`] : []),
  ...(process.env.REPLIT_DOMAINS ? [`https://${process.env.REPLIT_DOMAINS}`] : [])
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/api", router);

initialize("devnet", {
  creatorFeeAmount,
  marketCount,
  decimal,
  fundFeePercentage,
  bettingFeePercentage
});

app.get("/", (req, res) => {
  res.send("💕 Welcome to Prediction market server! 💕");
});

const port = process.env.PORT || "9000";
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`------------------------------------------------------------`);
  console.log(`|                                                          |`);
  console.log(`| 🤩 Server is running on port ${port}: http://localhost:${port} |`);
  console.log(`|                                                          |`);
  console.log(`------------------------------------------------------------`);
});
