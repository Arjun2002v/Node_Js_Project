import jwt from "jsonwebtoken";

//this function act as a barrirer which check and verify the jwt token toensure it is the ecact a user
const authMiddleWare = (req, res, next) => {
  const token = req.header["auth"];
  if (!token) {
    return res.sendStatus(401).json({ message: "No token found for the user" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.userID = decoded.id;
    next();
  });
};

export default authMiddleWare;
