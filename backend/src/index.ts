import express from "express";
import 'dotenv/config';
import cors from "cors";
import router from "./routes/user.route";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const mongodbURL = process.env.MONGODB_URL;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const main = async () => {
    // @ts-ignore
    await mongoose.connect(mongodbURL);
    app.listen(PORT);
    console.log(`MongoDB is connected & App is running on PORT: ${PORT}`);
}

main().catch(err => console.log(err));