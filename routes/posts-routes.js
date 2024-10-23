import express from "express";
import * as postsController from "../controllers/posts-controller.js";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No JWT provided" });
  }
  console.log(req.headers.authorization);
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
router.route("/").get(postsController.getPosts);

router.route("/create").post(authenticateToken, postsController.createPost);

router
  .route("/:id")
  .get(postsController.getSinglePost)
  .put(authenticateToken, postsController.editPost)
  .delete(authenticateToken, postsController.deletePost);

export default router;
