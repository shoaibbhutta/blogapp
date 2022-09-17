import server from "../BaseApi/server";
import { Post, PostInterface } from "../../Interfaces/Post";

import { AxiosResponse } from "axios";

export const getPosts = (
  page = "1",
  limit = "10"
): Promise<AxiosResponse<PostInterface>> => {
  return server.get(`/getPosts?page=${page}&&limit=${limit}`);
};

export const getPost = async (id: number): Promise<Post> => {
  try {
    const response = await server.get(`/getPost/${id}`);

    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const createPost = (data: FormData): Promise<AxiosResponse<Post>> => {
  return server.post("/uploadPost", data);
};

export const updatePost = async (
  id: number,
  data: FormData
): Promise<AxiosResponse<Post>> => {
  return await server.put(`/editPost/${id}`, data);
};

export const removePost = (id: number): Promise<AxiosResponse> => {
  return server.delete(`/deletePost/${id}`);
};

export const removePostImage = async (
  id: number,
  imageId: number
): Promise<AxiosResponse> => {
  return server.delete(`/deletePostImage/${id}/${imageId}`);
};

export const addCommentToPostApi = async (
  id: number,
  rootId: number | null,
  comment: string
): Promise<AxiosResponse<Post>> => {
  return server.post(`/addComment/${id}`, {
    rootId,
    comment,
  }); //postId
};
