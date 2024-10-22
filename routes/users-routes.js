import express from "express";
import * as usersController from "../controllers/users-controller.js";

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
router.route("/").get(usersController.getUsers);

router.route("/register").post(usersController.registerUser, authenticateToken);

router
  .route("/:id")
  .get(usersController.getSingleUser, authenticateToken)
  .put(usersController.editUser, authenticateToken)
  .delete(usersController.deleteUser, authenticateToken);

router.route("/login").post(usersController.loginUSer, authenticateToken);

export default router;
