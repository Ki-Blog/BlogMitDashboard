import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  //Neu
  let token;
  //Neu
  if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // const token = req.headers.authorization.split(" ")[1];
    //Neu
    token = req.headers.authorization.split(" ")[1];
    //Neu

  }
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};