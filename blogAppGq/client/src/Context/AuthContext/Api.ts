import server from "../BaseApi/server";
import { signinResponse } from "../../Interfaces/User";
import { User, signin, PostUser } from "../../Interfaces/User";
import { AxiosResponse } from "axios";
import { setToken } from "../../Utils/Token";

export const signupApi = async (data: User): Promise<boolean> => {
  try {
    await server.post("/signup", data);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const loginApi = async (data: signin): Promise<PostUser> => {
  const response: AxiosResponse<signinResponse> = await server.post(
    "/login",
    data
  );
  setToken(response.data.token);
  return response.data.user;
};

export const loggedInUserApi = async (): Promise<PostUser> => {
  const response: AxiosResponse<signinResponse> = await server.get(
    "/loggedInUser"
  );

  return response.data.user;
};

export const editUser = (
  id: number,
  data: FormData
): Promise<AxiosResponse<PostUser>> => {
  return server.put(`/editUser/${id}`, data);
};
