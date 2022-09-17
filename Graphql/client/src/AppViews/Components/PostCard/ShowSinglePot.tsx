import React, { useContext } from "react";
import { PostContext } from "../../../Context/PostContext/PostContext";
import CommentTextbar from "../Comments/CommentTextbar";
import Comments from "../Comments/CommentList";
import EditPost from "../../EditPost/EditPost";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel"; //carousel
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CommentIcon from "@material-ui/icons/Comment";

import FavoriteIcon from "@material-ui/icons/Favorite";
// import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { AuthContext } from "../../../Context/AuthContext/AuthContext";

// import { Post } from "../../../Interfaces/Post";
import { Post } from "../../../generated/graphql";

import { baseUrl } from "../../../Context/BaseApi/server";
interface IProps {
  post: Post;
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: "30px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "blue",
  },
}));

function ShowSinglePot({ post }: IProps) {
  const { deletePost, setSinglePost } = useContext(PostContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (post: Post) => {
    setSinglePost(post);

    setOpen(true);
    handleClose();
  };
  const handleDelete = (id: number) => {
    deletePost(id);
    handleClose();
    console.log(id);
  };

  const { user } = React.useContext(AuthContext);
  // console.log(user);
  // console.log(post);

  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={
                user && user.profileImageUrl
                  ? baseUrl + user.profileImageUrl
                  : "/ssa"
              }
            />
          }
          action={
            user && post && user.id === post.UserId ? (
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            ) : (
              <div>yes</div>
            )
          }
          // title={toTitleCase(`${post.User.email}`)}
          title={post && post.User ? `${post.User.email}` : ""}
          subheader={post.createdAt && new Date(post.createdAt).toDateString()}
        />
        <Menu
          // id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleEdit(post)}>Edit</MenuItem>
          <MenuItem onClick={() => handleDelete(post.id)}>Delete</MenuItem>
        </Menu>
        {post && post.PostMedia && post.PostMedia.length !== 0 ? (
          <Carousel>
            {post.PostMedia.map(
              (media) =>
                media && (
                  <CardMedia
                    className={classes.media}
                    image={baseUrl + media.mediaUrl}
                    // title={post.description && post.description}
                  />
                )
            )}
          </Carousel>
        ) : (
          ""
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description && post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color="secondary" />
          </IconButton>
          <IconButton aria-label="Comment" onClick={handleExpandClick}>
            <CommentIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Comments
            postId={post.id}
            Comments={post.Comments ? post.Comments : []}
          />
          {/* new Comment so its  CommentId will be null */}
          <CommentTextbar postId={post.id} CommentId={null} />
        </Collapse>
      </Card>
      <EditPost open={open} setOpen={setOpen} />
    </>
  );
}

export default ShowSinglePot;
