import express from "express";
import * as usersController from "../controllers/users-controller.js";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No JWT provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(498).json({ message: "Token validation failed" });
    }
    req.user = decoded;
    req.timeOfRequest = Date.now();
    next();
  });
}

const router = express.Router();

// Socket.IO authentication endpoint
router.post("/socket-auth", (req, res) => {
  const { token } = req.body;
  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid" });
    }
    res.status(200).json({ message: "Authenticated", user });
  });
});

// User routes
router.route("/").get(usersController.getUsers);

router.route("/register").post(usersController.registerUser);

router
  .route("/:id")
  .get(usersController.getSingleUser)
  .put(authenticateToken, usersController.editUser)
  .delete(authenticateToken, usersController.deleteUser);

router.route("/:id/posts").get(usersController.getUserPosts);

router.route("/login").post(usersController.loginUSer);

export default router;
