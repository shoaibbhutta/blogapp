import React from "react";
//, { useState }
import { makeStyles } from "@material-ui/core/styles";
// import { commentInterface } from "../../../Interfaces/Post";
import { Comment, Maybe } from "../../../generated/graphql";

// import PostCommentTextbar from "./CommentTextbar";
import List from "@material-ui/core/List";
// import Box from "@material-ui/core/Box";
// import SignleComment from "./SingleComment";
import ParentComment from "./ParentComment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
}));
interface Iprop {
  Comments: Maybe<Array<Maybe<Comment>>>;
  postId: number;
}
const Comments = ({ Comments, postId }: Iprop): JSX.Element => {
  const classes = useStyles();
  // const [showReply, setShowReply] = useState(false);
  // const [rootId, setRootId] = useState<number | null>(null);
  return (
    <List className={classes.root}>
      {Comments &&
        Comments.length !== 0 &&
        Comments.map(
          (comment, i) =>
            comment &&
            !comment.CommentId && (
              <>
                <ParentComment
                  comment={comment}
                  postId={postId}
                  childs={comment.Comments?comment.Comments:[]}
                />
              </>
            )
        )}
    </List>
  );
};

export default Comments;
