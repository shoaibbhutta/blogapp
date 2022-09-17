import "reflect-metadata";
import {
  Query,
  Resolver,
  Mutation,
  Arg,
  ObjectType,
  Field,
  InputType,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import User from "../../model/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { isAuth } from "../../utils/auth";
import { MyContext } from "../../interfaces/context";
@ObjectType()
class LoginResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
  @Field(() => Number)
  status!: number;
}

@InputType()
export class signupBody {
  @Field()
  email!: string;
  @Field()
  firstName!: string;
  @Field()
  lastName!: string;
  @Field()
  date_of_birth!: string;
  @Field()
  password!: string;
}

@ObjectType()
class SignupResponse {
  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => Number)
  status!: number;
}
@Resolver()
export class UserResollver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    try {
      const user: User | null = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        return { status: 400, message: "no user with message found " };
      }

      const doMatch = bcrypt.compareSync(password, user.password);
      if (!doMatch) {
        return {
          status: 400,
          message: "you have entered wrong email or password",
        };
      }
      const token = jwt.sign({ userId: user.id }, config.JWTKEY, {
        expiresIn: "365d",
      });
      // res.status(200).json({ user, token });
      return { status: 200, user, token };
    } catch (e) {
      console.trace(e);
      return { status: 500, message: "something went wrong in login" };
      // res.status(200).json({ messsage: "something went wrong in login" });
    }
  }

  @Mutation(() => SignupResponse)
  async signup(@Arg("userBody") userBody: signupBody): Promise<SignupResponse> {
    try {
      const email = userBody.email;
      const password = userBody.password;

      const user: User | null = await User.findOne({
        where: { email: email },
      });
      if (user) {
        return {
          status: 400,
          message: "the user with this email already exist try other",
        };
      }
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const newUser: User = new User({
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        date_of_birth: new Date(userBody.date_of_birth),
        email: email,
        password: hashedPassword,
        RoleId: 1,
      });

      await newUser.save();

      return { status: 200, message: "user created successfully" };
    } catch (e) {
      console.trace(e);
      return { status: 500, message: "something went wrong in signup" };
    }
  }
  @UseMiddleware(isAuth)
  @Query(() => User)
  async getLoggedInUser(@Ctx() { req }: MyContext): Promise<User> {
    const user: User | null = await User.findByPk(req.userId);
    if (!user) {
      throw new Error("no user found");
    } else {
      return user;
    }
  }
}
