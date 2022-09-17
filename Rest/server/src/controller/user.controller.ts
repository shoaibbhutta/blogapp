import UserModel from "../model/User.model.js";
import { UserInterface } from "../interfaces/user";
import { Request, NextFunction, Response } from "express";
import { deleteFile } from "../utils/imageDelete";

import bcrypt from "bcryptjs";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userBody = req.body as UserInterface;
    const email = userBody.email;
    const password = userBody.password;

    let user: UserModel|null = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "no user exist with this email" });
    }
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      user.password = hashedPassword;
    }

    if (req.file) {
      if (user.profileImageUrl) {
        deleteFile(user.profileImageUrl);
      }
      user.profileImageUrl = req.file.path;
    }
    user.firstName = userBody.firstName;
    user.lastName = userBody.lastName;
    user.date_of_birth = new Date(userBody.date_of_birth);
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in postAddRole" });
    console.trace(e);
  }
};
