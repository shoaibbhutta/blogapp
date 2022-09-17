"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
// import { Ctx } from "type-graphql";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
// interface authBody extends Request {
//   userId?: number | undefined;
// }
// export const isAuthenticated: RequestHandler = (
//   req: authBody,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const header = req.headers["authorization"];
//     if (typeof header === "undefined") {
//       return res
//         .status(401)
//         .json({ message: "authentication credentials are not provided" });
//     }
//     const token = header.split(" ")[1];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "authentication credetils were not provided" });
//     }
//     const decoded = jwt.verify(token, config.JWTKEY);
//     req.userId = (decoded as any).userId;
//   } catch (e) {
//     console.log("problem is here in authenticating a user" + e);
//     return res.status(500).json({ message: "Server side Error isAuth" });
//   }
// };
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
const isAuth = ({ context }, next) => {
    const { req } = context;
    const header = req.headers["authorization"];
    if (typeof header === "undefined") {
        throw new Error("not authenticated");
    }
    const token = header.split(" ")[1];
    if (!token) {
        throw new Error("no tokens provided");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWTKEY);
    if (decoded) {
        req.userId = decoded.userId;
        console.log("im in next here");
        return next();
    }
    else {
        console.log("im in next error");
        throw new Error("token is not provided");
    }
};
exports.isAuth = isAuth;
