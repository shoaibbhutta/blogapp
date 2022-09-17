import Login from "../AuthPages/Login/Login";
import Signup from "../AuthPages/Signup/Signup";
import Home from "../AppViews/Home/Home";
import Profile from "../AppViews/Profile/Profile";
export const authRoutes = [
  {
    path: "/",
    component: Login,
    exact: true,
  },
  {
    path: "/signup",
    component: Signup,
    exact: true,
  },
];

export const AppRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/myProfile",
    component: Profile,
    exact: true,
  },
];
