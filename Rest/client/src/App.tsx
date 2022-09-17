import { useContext, useEffect } from "react";
import { Route, Router } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import history from "./history";
import { getToken } from "./Utils/Token";
import { authRoutes, AppRoutes } from "./Routes/appRoutes";
import FullPageLoader from "./Components/FullPageLoader";
import { AuthContext } from "./Context/AuthContext/AuthContext";
import { PostProvider, PostContext } from "./Context/PostContext/PostContext";
import Alert from "./Components/Alert";

function App() {
  const { isSignedIn, loading, getLoggedInUser } = useContext(AuthContext);
  const { fetchPosts } = useContext(PostContext);
  useEffect(() => {
    const token = getToken();

    if (token) {
      fetchPosts("1", "10");
      getLoggedInUser();
    }
  }, []);
  return (
    <PostProvider>
      <Alert />

      {loading && <FullPageLoader />}

      <Router history={history}>
        <Navbar />
        {!isSignedIn
          ? authRoutes.map((route) => (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))
          : AppRoutes.map((route) => (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
      </Router>
    </PostProvider>
  );
}

export default App;
