import express from "express";
import morgan from "morgan";
import router from "./routes/characterRouter.js";
import collabRouter from "./routes/collabRouter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*"
  })
);
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use("/characters", router);
app.use("/collab", collabRouter);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
