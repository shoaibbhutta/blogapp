import React from "react";

import { Post } from "../../../Interfaces/Post";
import ShowSinglePot from "./ShowSinglePot";

// import { toTitleCase } from "../../../Utils/CamelCase";

// import Box from "@material-ui/core/Box";

interface PostCardProps {
  posts: Post[];
}
export default function PostCard({ posts }: PostCardProps) {
  return (
    // posts &&
    // posts.length !== 0 && (
    <>
      {posts.map((post, i) => (
        <>
          <ShowSinglePot post={post} key={i} />
        </>
      ))}
    </>
  );
  // );
}
