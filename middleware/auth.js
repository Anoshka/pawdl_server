import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
  // string split example:
  // "Bearer token"
  // ["Bearer",  "token"]
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

export default { authenticateToken };
