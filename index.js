// library imports
import "dotenv/config";
import express from "express";
import cors from "cors";
//import http from "http"; // Import the http module
import { Server } from "socket.io"; // Import Socket.IO

// init app
const app = express();

// set port
const PORT = process.env.PORT || 5050;

// local route imports
import usersRoutes from "./routes/users-routes.js";
import postsRoutes from "./routes/posts-routes.js";

// middleware for library
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//const server = http.createServer(app);

const io = new Server(5050, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("authenticate", (token) => {
    // Token validation logic here
    console.log("Token received:", token);
  });

  socket.on("sendMessage", (message) => {
    // Create a message object with user info (you may need to adjust this based on your data structure)
    const messageObject = {
      user: "",
      message: message,
    };
    io.emit("receiveMessage", messageObject);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// middleware for routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

// io.listen(5050, () => {
//   console.log(`socket running at http://localhost:5050`);
// });

// Listen on port
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
