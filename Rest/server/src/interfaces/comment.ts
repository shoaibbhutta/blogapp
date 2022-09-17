import { Optional } from "sequelize";
export interface commentInterface {
  id: number;
  comment: string;
  CommentId?: number|null;
  PostId?: number;
  UserId?: number;
}

export interface CommentCreationAttributes
  extends Optional<commentInterface, "id"> {}
