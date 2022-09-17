import React, { useState } from "react";
//
import { makeStyles } from "@material-ui/core/styles";
// import { commentInterface } from "../../../Interfaces/Post";
import PostCommentTextbar from "./CommentTextbar";
import { Comment, Maybe } from "../../../generated/graphql";
import Box from "@material-ui/core/Box";
import SignleComment from "./SingleComment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
}));
interface ParentCommentProp {
  comment: Maybe<Comment>;
  postId: number;
  childs: Maybe<Maybe<Comment>[]>;
}
const ParentComment = ({
  comment,
  postId,
  childs,
}: ParentCommentProp): JSX.Element => {
  const classes = useStyles();
  const [showReply, setShowReply] = useState(false);
  const [rootId, setRootId] = useState<number | null>(null);
  return (
    <Box className={classes.root}>
      {comment && (
        <>
          <SignleComment
            postId={postId}
            comment={comment}
            key={postId}
            childComments={comment.Comments ? comment.Comments : []}
            showReply={showReply}
            setShowReply={setShowReply}
            rootId={rootId}
            setRootId={setRootId}
            childs={childs}
          />
          {showReply && (
            // here using it as reply so there will be a CommentId
            <Box style={{ marginLeft: "40px", marginTop: "10px" }} key={postId}>
              <PostCommentTextbar postId={postId} CommentId={rootId} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
export default ParentComment;
