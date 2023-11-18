import express from "express";
import cors from "cors";
import DBConnection from "../database/db.js"
import userRouter from "../routes/userRoute.js"
import adminRouter from "../routes/adminRoute.js"

const app = express();
const port = 3001;

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({exposedHeaders: ['Content-Disposition']}));

// Routes

app.use("/auth",userRouter);
app.use("/admin", adminRouter);

// Database connection
DBConnection();

app.listen(port, () => console.log(`server started on port ${port}!`));