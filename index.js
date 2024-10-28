import "dotenv/config";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

// init app
const app = express();

// set port
const PORT = process.env.PORT || 5050;

// local route imports
import usersRoutes from "./routes/users-routes.js";
import postsRoutes from "./routes/posts-routes.js";
import chatsRoutes from "./routes/chats-routes.js";

// middleware for library
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

  socket.on(
    "sendMessage",
    (
      id,
      sender_id,
      sender_name,
      receiver_id,
      receiver_name,
      message,
      created_at
    ) => {
      const messageObject = {
        id: id,
        sender_id: sender_id,
        sender_name: sender_name,
        receiver_id: receiver_id,
        receiver_name: receiver_name,
        message: message,
        created_at: created_at,
      };
      io.emit("receiveMessage", messageObject);
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// middleware for routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/chat", chatsRoutes);

// Listen on port
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
