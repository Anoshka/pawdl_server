//library imports
import "dotenv/config";
import express from "express";
import cors from "cors";

//init app
const app = express();

//set port
const PORT = process.env.PORT || 5050;

//local route imports
import usersRoutes from "./routes/users-routes.js";

//middleware for library
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//middleware for routes
app.use("/api/users", usersRoutes);

//listen on port
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
