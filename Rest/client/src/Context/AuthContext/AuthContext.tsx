import { FC, useState, createContext, SetStateAction } from "react";
import { ProviderInterface } from "../../Interfaces/ProviderInterface";

import { loggedInUserApi, editUser } from "./Api";
import history from "../../history";
import { PostUser } from "../../Interfaces/User";
import { removeToken } from "../../Utils/Token";
import { AxiosResponse } from "axios";

interface AuthContextInterface {
  isSignedIn: boolean;
  user: PostUser | null;
  loading: boolean;
  setIsSignedIn: (data: boolean) => void;
  setUser: (data: PostUser) => void;
  handleSignout: () => void;
  setLoading: (value: SetStateAction<boolean>) => void;
  getLoggedInUser: () => void;
  updateUser: (data: FormData) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isSignedIn: false,
  user: null,
  loading: false,
  setIsSignedIn: (data: boolean) => {},
  setUser: (data: PostUser) => {},
  handleSignout: () => {},
  setLoading: (value: SetStateAction<boolean>) => {},
  getLoggedInUser: () => {},
  updateUser: (data: FormData) => {},
});

export const AuthProvider: FC = (props: ProviderInterface): JSX.Element => {
  const { children } = props;
  const [isSignedIn, isSignedInSetter] = useState<boolean>(false);
  const [user, userSetter] = useState<PostUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = (user: PostUser) => {
    userSetter(user);
  };

  const setIsSignedIn = (arg0: boolean) => {
    isSignedInSetter(arg0);
  };

  const handleSignout = () => {
    removeToken();
    isSignedInSetter(false);
    history.push("/");
  };

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const user: PostUser = await loggedInUserApi();
      isSignedInSetter(true);
      userSetter(user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const updateUser = async (data: FormData) => {
    try {
      setLoading(true);
      const res: AxiosResponse<PostUser> = await editUser(data);

      userSetter(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        loading,
        setIsSignedIn,
        handleSignout,
        setUser,
        setLoading,
        getLoggedInUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
