import express from "express";
import morgan from "morgan";
import router from "./routes/characterRouter.js";
import cors from "cors";

const app = express();
// const PORT = process.env.PORT;

app.use(cors("*"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use("/characters", router);

// app.listen(PORT, function() {
//     console.log(`Server listening on port ${PORT}`);
// });

export default app;