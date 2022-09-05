import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("App 5edmet");
});
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_ID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch(error => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
