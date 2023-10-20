import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import ChatRoutes from "./Routes/ChatRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/chat', ChatRoutes);
app.use('/user', UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
