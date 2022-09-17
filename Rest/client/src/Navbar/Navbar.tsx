import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { baseUrl } from "../Context/BaseApi/server";
import Avatar from "@material-ui/core/Avatar";

export default function Nav() {
  const classes = useStyles();
  const { isSignedIn, user, handleSignout } = useContext(AuthContext);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleLogout = () => {
    handleSignout();
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="primary" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawer}
            >
              <MenuIcon />
            </IconButton>
            {/* <Link to="/" className={classes.title}> */}
            <Typography variant="h6" className={classes.title} color="inherit">
              Kwanso Social Media
            </Typography>
            {/* <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "./logo.png"}
                className={classes.title}
              /> */}
            {/* </Link> */}

            <div className={classes.icons}>
              <Link to="/" className={classes.linkText}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <HomeOutlinedIcon />
                  <span className={classes.linkText}>Home</span>
                </IconButton>
              </Link>
              <Link to={"/contactus"} className={classes.linkText}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <ContactPhoneIcon />
                  <span className={classes.linkText}>Contact</span>
                </IconButton>
              </Link>

              {isSignedIn ? (
                <Link to="/dashboard" className={classes.linkText}>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <DashboardIcon />
                    <span className={classes.linkText}>Dashboard</span>
                  </IconButton>
                </Link>
              ) : (
                //
                ""
              )}
            </div>

            <div className={classes.authButtons}>
              {!isSignedIn ? (
                <>
                  <Link to="/" className={classes.buttonLink}>
                    <Button variant="outlined" color="inherit">
                      signin
                    </Button>
                  </Link>
                  <Link to="/signup" className={classes.buttonLink}>
                    <Button
                      variant="contained"
                      color="default"
                      style={{ marginLeft: "10px" }}
                    >
                      SignUp
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className={classes.profileMenue}
                    onClick={handleProfileMenuOpen}
                  >
                    <Avatar
                      className={classes.avatar}
                      src={
                        user && user.profileImageUrl
                          ? baseUrl + user.profileImageUrl
                          : "/ssa"
                      }
                    />
                    <span
                      className={classes.linkText}
                      style={{ marginTop: "4px" }}
                    >
                      {" "}
                      {user ? user.email : ""}
                    </span>
                    {/* </IconButton> */}
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                  >
                    <Link to="/myProfile" className={classes.link}>
                      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Signout</MenuItem>
                  </Menu>
                </>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Hidden>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {<ChevronLeftIcon />}
            </IconButton>
          </div>

          <List component="nav" aria-label="main mailbox folders">
            {/* <Link to="/" style={{ textDecoration: "none" }}> */}
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" className={classes.link} />
            </ListItem>
            {/* </Link> */}
            <Divider />
            {isSignedIn ? (
              <>
                <Link to="/dashboard" color="primary" className={classes.link}>
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Link>
                <Divider />
              </>
            ) : (
              ""
            )}
            <Link to={"/contactus"} color="primary" className={classes.link}>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>
                  <ContactPhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Contactus" className={classes.link} />
              </ListItem>
            </Link>
            <Divider />

            {!isSignedIn ? (
              <>
                <Link to="/auth/Login" color="primary" className={classes.link}>
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <AccountCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" className={classes.link} />
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/signup" color="primary" className={classes.link}>
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <PersonAddOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Signup" className={classes.link} />
                  </ListItem>
                </Link>
              </>
            ) : (
              <>
                <Link to="/myProfile" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon onClick={handleDrawerClose}>
                      <AccountCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon onClick={handleDrawerClose}>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Signout" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Hidden>
    </div>
  );
}
