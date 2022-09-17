import User from "../model/User.model";
import { Request, RequestHandler, NextFunction, Response } from "express";

import jwt from "jsonwebtoken";
import config from "../config/config";

interface authBody extends Request {
  userId?: number | undefined;
}
export const isAuthenticated: RequestHandler = (
  req: authBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (typeof header === "undefined") {
      return res
        .status(401)
        .json({ message: "authentication credentials are not provided" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "authentication credetils were not provided" });
    }
    const decoded = jwt.verify(token, config.JWTKEY);

    req.userId = (decoded as any).userId;
    next();
  } catch (e) {
    console.log("problem is here in authenticating a user" + e);
    return res.status(500).json({ message: "Server side Error isAuth" });
  }
};

// export const isAdmin = async (
//   req: authBody,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await User.findByPk(req.body.userId);

//     if (user && user.RoleId !== 2) {
//       return res.status(400).json({ message: "not authenticated" });
//     }
//     req.user && (req.user.isAdmin = true);
//     next();
//   } catch (e) {
//     console.trace(e);
//     console.log("problem is here in util is Admin");
//     return res.status(500).json({ message: "Server side Error isAdmin" });
//   }
// };
