import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "#AARRGGBB",
  },
  loader: {
    position: "absolute",
    top: "45%",
    left: "50%",

    zIndex: 1000,
  },
}));
const FullPageLoader = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box>
      <CircularProgress className={classes.loader} />
    </Box>
  );
};

export default FullPageLoader;
