import { Request } from "express";

export interface authBody extends Request {
  user?: {
    isAuthenticated: boolean;
    userId: number | undefined;
    isAdmin: boolean;
  };
}
