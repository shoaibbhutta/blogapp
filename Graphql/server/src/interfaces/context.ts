import { Request } from "express";

interface authBody extends Request {
  userId?: number | undefined;
}


export interface MyContext {
  req: authBody;
}
