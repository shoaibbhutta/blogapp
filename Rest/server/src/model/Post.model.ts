import { Association, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User.model";
import PostMedia from "./PostMedia.model";
import Comments from "./Comment.model";
import { postInterface, PostCreationAttributes } from "../interfaces/post";

class Post
  extends Model<postInterface, PostCreationAttributes>
  implements postInterface
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public description!: string;
  public UserId!: number;
  public readonly user?: User;
  public readonly comments?: Comments[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly PostMedia!: PostMedia[];
  public static associations: {
    postMedia: Association<Post, PostMedia>;
    comments: Association<Post, Comments>;
  };
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    tableName: "posts",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Post;

User.hasMany(Post);
Post.belongsTo(User);
