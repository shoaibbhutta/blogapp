import { Association, DataTypes, Model } from "sequelize";
import { ObjectType, Field } from "type-graphql";

import sequelize from "../config/database";
import User from "./User.model";
import PostMedia from "./PostMedia.model";
import Comments from "./Comment.model";
import { postInterface, PostCreationAttributes } from "../interfaces/post";
@ObjectType()
class Post
  extends Model<postInterface, PostCreationAttributes>
  implements postInterface
{
  @Field()
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  @Field()
  public description!: string;
  @Field()
  public UserId!: number;
  @Field((type) => User, { nullable: true })
  public readonly User?: User;
  @Field((type) => [Comments], { nullable: "itemsAndList" })
  public readonly Comments?: Comments[];

  @Field()
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  @Field((type) => [PostMedia], { nullable: "itemsAndList" })
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

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(PostMedia);
PostMedia.belongsTo(Post);
Post.hasMany(Comments);
Comments.belongsTo(Post);

export default Post;
