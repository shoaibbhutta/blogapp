import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "70px",
    justifyContent: "center",
  },
  title: {
    textDecoration: "none",
    // color: "black",
    fontWeight: "bold",
  },
  linkText: {
    textDecoration: "none",
    fontSize: "16px",
    marginLeft: "10px",
    color: "white",
    paddingTop: "5px",
  },
  buttonLink: {
    textDecoration: "none",
    color: "white",
  },
  avatar: {
    backgroundColor: "blue",
  },
  profileMenue: {
    display: "flex",
    height: "50px",
    cursor: "pointer",
    marginTop: "15px",
  },
  icons: {
    position: "absolute",
    right: "40%",
    "@media (max-width: 1030px)": {
      position: "absolute",
      right: "0",
    },
    "@media (max-width: 715px)": {
      display: "none",
    },
  },
  authButtons: {
    position: "absolute",
    right: "0",
    "@media (max-width: 1030px)": {
      display: "none",
    },
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  link: { textDecoration: "none", color: "black" },
}));
