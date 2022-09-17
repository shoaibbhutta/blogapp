import { Optional } from "sequelize";
export interface postMediaInterface {
  id: number;
  mediaUrl: string;
  PostId?: number;
}

export interface PostMediaCreationAttributes
  extends Optional<postMediaInterface, "id"> {}
