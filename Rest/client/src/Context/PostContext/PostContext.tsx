import React, { FC, useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { AlertContext } from "../AlertContext/AlertContext";
// import { useQuery } from "react-query";

import { AxiosResponse } from "axios";

import {
  getPosts,
  getPost,
  createPost,
  removePost,
  addCommentToPostApi,
  removePostImage,
  updatePost,
} from "./Api";
// import history from "../../history";
import { Post, PostInterface } from "../../Interfaces/Post";
import { ProviderInterface } from "../../Interfaces/ProviderInterface";

interface PostContextInterface {
  posts: Post[];
  singlePost: Post | null;
  totalPostPages: number;
  CreatePost: (data: FormData) => void;
  deletePost: (id: number) => void;
  deletePostImage: (id: number, imageId: number) => void;
  editPost: (id: number, data: FormData) => void;
  fetchPosts: (page: string, limit: string) => void;
  fetchPost: (id: number) => void;
  setSinglePost: (value: React.SetStateAction<Post | null>) => void;

  addCommentToPost: (
    postId: number,
    rootId: number | null,
    comment: string
  ) => void;
}

export const PostContext = React.createContext<PostContextInterface>({
  posts: [],
  singlePost: null,
  totalPostPages: 1,
  CreatePost: (data: FormData) => {},
  deletePost: (id: number) => {},
  deletePostImage: (id: number, imageId: number) => {},
  editPost: (id: number, data: FormData) => {},
  fetchPosts: (page: string, limit: string) => {},
  fetchPost: (id: number) => {},
  setSinglePost: (value: React.SetStateAction<Post | null>) => {},

  addCommentToPost: (
    postId: number,
    rootId: number | null,
    comment: string
  ) => {},
});

export const PostProvider: FC = (props: ProviderInterface): JSX.Element => {
  const { setLoading } = useContext(AuthContext);
  const { showServerError } = useContext(AlertContext);

  const { children } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [totalPostPages, setTotalPostPages] = useState<number>(1);
  const fetchPosts = async (page = "1", limit = "10") => {
    try {
      const result: AxiosResponse<PostInterface> = await getPosts(page, limit);
      const {
        data: { posts, count },
      } = result;
      setPosts(posts);
      setTotalPostPages(count);
    } catch (e) {
      console.log(e);
      showServerError();
    }
  };

  const fetchPost = async (id: number) => {
    setLoading(true);
    const result = await getPost(id);
    setSinglePost(result);
    setLoading(false);
  };
  const CreatePost = async (data: FormData) => {
    try {
      setLoading(true);
      const res: AxiosResponse<Post> = await createPost(data);
      const list = [res.data, ...posts];
      setPosts(list);
      setLoading(false);
    } catch (e) {
      showServerError();
    }
  };

  const deletePost = async (id: number) => {
    try {
      setLoading(true);
      await removePost(id);
      const list = posts.filter((post) => post.id !== id);
      setPosts(list);
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

  const editPost = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      const res = await updatePost(id, data);
      let list: Post[] = [];

      for (let post of posts) {
        if (post.id === id) {
          list.push(res.data);
        } else {
          list.push(post);
        }
      }
      setPosts(list);
      setSinglePost(null);
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
      const res = await addCommentToPostApi(postId, rootId, comment);

      let list: Post[] = [];
      for (let item of posts) {
        if (item.id === postId) {
          list.push(res.data);
        } else {
          list.push(item);
        }
      }

      setPosts([...list]);
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
