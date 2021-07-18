import React from "react";
import clsx from "clsx";
import { imagesLogo } from "./imaGesLogo";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./css/headerResponsive.css";
// function component SingOutPage
import SingOutPage from "../Sign-Out/Sign-Out.page";
// redux
import { useSelector } from "react-redux";
// react-router-dom
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CinemaDetailPage from "../CinemaDetailPage/CinemaDetail.page";

//  drawer
const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));
//  drawer

const HeaderResponsivePage = () => {
  //  drawer
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //  drawer

  // take data reducer/signIn.reducer
  let signIn = useSelector((state) => {
    return state.signInReducer.auth;
  });
  const userSigIn = JSON.parse(localStorage.getItem("userLogin"));
  if (userSigIn) {
    let signInUpdate = { ...signIn };
    signInUpdate.hoTen = userSigIn.hoTen;
    signIn = signInUpdate;
  }

  return (
    <div className={`heaerResponsive ${classes.root}`}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="headerResponsive">
          <Typography variant="h6" noWrap className={classes.title}>
            <Link to="/" className="titleLink">
              <img className="headerloGo" src={imagesLogo.img} alt="logo" />
            </Link>
          </Typography>
          <IconButton
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Lịch Chiếu", "Cụm Rạp", "Tin Tức", "Ứng Dụng"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          <ListItem>
            <CinemaDetailPage />
          </ListItem>
          <ListItem>
            {signIn.hoTen !== "" ? (
              <>
                <SingOutPage />
                {/* acces to pages/Sign-Out/signout.page-rfc */}
              </>
            ) : (
              <div className="headerTitleLinkThere">
                <p>
                  <AccountCircleIcon className="headerIconLogIn" />
                  <Link to="/signUp" className="headerTitleThere">
                    Đăng Kí {/* acces to pages/Sign-Up/Sign-Up.page-rcc*/}
                  </Link>
                </p>
                <p>
                  <LocationOnIcon className="headerIconLogIn" />
                  <Link to="/signIn" className="headerTitleThere">
                    Đăng Nhập {/* acces to pages/Sign-In/Sign-In.page-rfc */}
                  </Link>
                </p>
              </div>
            )}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
export default HeaderResponsivePage;
