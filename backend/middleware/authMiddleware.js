import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.json({ message: "No token" });
  jwt.verify(token, "secret123", (err, user) => {
    if (err) return res.json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
