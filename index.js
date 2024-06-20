import express from "express";
import noteRouter from "./routes/noteRouter.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/note", noteRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
