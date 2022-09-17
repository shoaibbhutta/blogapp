import { Request, NextFunction, Response } from "express";
import UserModel from "../model/User.model.js";
import { UserInterface } from "../interfaces/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface authBody extends Request {
  userId?: number | undefined;
}

// const User = new UserModel();
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "email and password both are required" });
    }
    const email = req.body.email;
    const password = req.body.password;
    const user: UserModel | null = await UserModel.findOne({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User With this email does not exist" });
    }

    const doMatch = bcrypt.compareSync(password, user.password);
    if (!doMatch) {
      return res
        .status(400)
        .json({ message: "you have entered wrong email or password" });
    }
    const token = jwt.sign({ userId: user.id }, config.JWTKEY, {
      expiresIn: "365d",
    });
    res.status(200).json({ user, token });
  } catch (e) {
    console.trace(e);
    res.status(200).json({ messsage: "something went wrong in login" });
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.date_of_birth
    ) {
      return res
        .status(400)
        .json({ message: "Required Fields are not provided" });
    }
    const userBody = req.body as UserInterface;
    const email = userBody.email;
    const password = userBody.password;

    const user:UserModel|null= await UserModel.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(400)
        .json({ message: "the user with this email already exist try other" });
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser: UserModel = new UserModel({
      firstName: userBody.firstName,
      lastName: userBody.lastName,
      date_of_birth: new Date(userBody.date_of_birth),
      email: email,
      password: hashedPassword,
      RoleId: 1,
    });

    await newUser.save();

    res.status(200).json({ message: "user created successfully" });
  } catch (e) {
    console.trace(e);
    res.status(200).json({ messsage: "something went wrong in signup" });
  }
};



const getLoggedInUser = async (
  req: authBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserModel | null = await UserModel.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }
    return res.status(200).json({ user });
  } catch (e) {
    res
      .status(500)
      .json({ message: "something went wrong in getLoggedInUser" });
    console.trace(e);
  }
};
export default { login, signup, getLoggedInUser };
