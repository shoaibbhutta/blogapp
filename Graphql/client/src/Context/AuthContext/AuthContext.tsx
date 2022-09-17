import { FC, useState, createContext, SetStateAction, useEffect } from "react";
import { ProviderInterface } from "../../Interfaces/ProviderInterface";
import { useGetLoggedInUSerLazyQuery } from "../../generated/graphql";
import { editUser } from "./Api";
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

  const [
    LoggedInUserGraphql,
    { data: loaggedInUserData, loading: loggedInUserLoading },
  ] = useGetLoggedInUSerLazyQuery();

  useEffect(() => {
    if (!loggedInUserLoading && loaggedInUserData) {
      setUser(loaggedInUserData.getLoggedInUser as PostUser);
    }
  }, [loaggedInUserData, loggedInUserLoading]);
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
      // const user: PostUser = await loggedInUserApi();
      LoggedInUserGraphql();
      isSignedInSetter(true);
      // userSetter(user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const updateUser = async (data: FormData) => {
    try {
      setLoading(true);
      if (user) {
        const res: AxiosResponse<PostUser> = await editUser(user.id, data);

        userSetter(res.data);
      }
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
