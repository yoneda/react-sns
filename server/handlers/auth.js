import jwt from "jsonwebtoken";

export default async function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("unauthorized: no token provided");
  }
  const secret = process.env.SECRET;
  const decoded = await jwt.verify(token, secret);
  req.mail = decoded.mail;
  next();
}
