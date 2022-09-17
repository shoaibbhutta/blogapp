import React, { FC, useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { AlertContext } from "../AlertContext/AlertContext";
import {
  usePostLazyQuery,
  Post as graphqlPost,
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useCreateCommentMutation,
} from "../../generated/graphql";

// import { AxiosResponse } from "axios";

import {
  // addCommentToPostApi,
  removePostImage,
  // updatePost,
  uploadPostImageApi,
} from "./Api";
// import history from "../../history"  PostInterface;
//  PostInterface,
import { Post } from "../../Interfaces/Post";
import { ProviderInterface } from "../../Interfaces/ProviderInterface";

interface PostContextInterface {
  posts: Post[];
  singlePost: graphqlPost | null;
  totalPostPages: number;
  CreatePost: (description: string, imageData: FormData | undefined) => void;
  deletePost: (id: number) => void;
  deletePostImage: (id: number, imageId: number) => void;
  editPost: (
    id: number,
    description: string,
    data: FormData | undefined
  ) => void;
  fetchPosts: (page: string, limit: string) => void;
  fetchPost: (id: number) => void;
  setSinglePost: (value: React.SetStateAction<graphqlPost | null>) => void;

  addCommentToPost: (
    postId: number,
    rootId: number | null,
    comment: string
  ) => void;
  postDataSet: graphqlPost[] | undefined;
}

export const PostContext = React.createContext<PostContextInterface>({
  posts: [],
  singlePost: null,
  totalPostPages: 1,
  CreatePost: (description: string, imageData: FormData | undefined) => {},
  deletePost: (id: number) => {},
  deletePostImage: (id: number, imageId: number) => {},
  editPost: (id: number, description: string, data: FormData | undefined) => {},
  fetchPosts: (page: string, limit: string) => {},
  fetchPost: (id: number) => {},
  setSinglePost: (value: React.SetStateAction<graphqlPost | null>) => {},

  addCommentToPost: (
    postId: number,
    rootId: number | null,
    comment: string
  ) => {},
  postDataSet: undefined,
});

export const PostProvider: FC = (props: ProviderInterface): JSX.Element => {
  const { setLoading } = useContext(AuthContext);
  const { showServerError } = useContext(AlertContext);
  const [goPosts, { data, loading: getPostsLoading }] = usePostLazyQuery();
  const [makePost] = useCreatePostMutation();
  const [removePost] = useDeletePostMutation();
  const [createComment] = useCreateCommentMutation();
  const { children } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [singlePost, setSinglePost] = useState<graphqlPost | null>(null);
  const [totalPostPages, setTotalPostPages] = useState<number>(1);
  const [postDataSet, setDataSet] = useState<graphqlPost[] | undefined>(
    undefined
  );
  const [updatePost] = useEditPostMutation();

  useEffect(() => {
    if (!getPostsLoading && data) {
      setDataSet(data.getPosts.posts);
      setTotalPostPages(data.getPosts.count);
    }
  }, [getPostsLoading, data?.getPosts.posts, data]);
  const fetchPosts = async (page = "1", limit = "10") => {
    try {
      goPosts({
        variables: {
          page: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (e) {
      console.log(e);
      showServerError();
    }
  };

  const fetchPost = async (id: number) => {
    setLoading(true);

    setLoading(false);
  };
  const CreatePost = async (
    description: string,
    imageData: FormData | undefined
  ) => {
    try {
      setLoading(true);

      const res = await makePost({
        variables: {
          description: description,
        },
      });
      if (res.data && res.data.createPost.post) {
        if (postDataSet && !imageData) {
          const list = [res.data.createPost.post, ...postDataSet];
          setDataSet(list);
        }
        if (imageData) {
          await uploadPostImage(imageData, res.data.createPost.post.id);
        }
        setLoading(false);
      }
    } catch (e) {
      showServerError();
    }
  };

  const uploadPostImage = async (data: FormData, postId: number) => {
    const res = await uploadPostImageApi(postId, data);
    console.log(res.data);
    if (postDataSet) {
      const list = [res.data, ...postDataSet];
      setDataSet(list);
    }
  };

  const deletePost = async (id: number) => {
    try {
      setLoading(true);
      await removePost({
        variables: {
          deletePostId: id,
        },
      });
      if (postDataSet) {
        const list = postDataSet.filter((post) => post.id !== id);
        setDataSet(list);
      }
      setLoading(false);
    } catch (e) {
      showServerError();
    }
  };
  const deletePostImage = async (id: number, imageId: number) => {
    try {
      setLoading(true);

      await removePostImage(id, imageId);
      setLoading(false);
    } catch (e) {
      showServerError();
    }
  };

  const editPost = async (
    id: number,
    description: string,
    data: FormData | undefined
  ) => {
    try {
      setLoading(true);
      if (data) {
        uploadPostImage(data, id);
      }
      const res = await updatePost({
        variables: { editPostEditPostBody: { description }, editPostId: id },
      });
      let list: graphqlPost[] = [];
      if (postDataSet) {
        for (let post of postDataSet) {
          if (post.id === id) {
            res.data &&
              res.data.editPost.post &&
              list.push(res.data.editPost.post);

            // console.log(
            //   "=================>>>>>>>>>",
            //   res.data && res.data.editPost.post
            // );
          } else {
            list.push(post);
          }
        }
        setDataSet(list);
        setSinglePost(null);
      }
      setLoading(false);
    } catch (e) {
      showServerError();
    }
  };

  const addCommentToPost = async (
    postId: number,
    rootId: number | null,
    comment: string
  ) => {
    try {
      setLoading(true);
      const res = await createComment({
        variables: {
          createCommentCreateCommentBody: {
            rootId,
            postId,
            comment,
          },
        },
      });
      if (res.data && postDataSet && res.data.createComment.post) {
        let list: graphqlPost[] = [];
        for (let post of postDataSet) {
          if (post.id === postId) {
            list.push(res.data.createComment.post);
          } else {
            list.push(post);
          }
        }
        setDataSet(list);
      }

      setLoading(false);
    } catch (e) {
      showServerError();
    }
  };
  return (
    <PostContext.Provider
      value={{
        totalPostPages,
        posts,

        singlePost,
        CreatePost,
        deletePost,
        deletePostImage,
        editPost,
        fetchPosts,
        fetchPost,
        setSinglePost,
        addCommentToPost,
        postDataSet,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
