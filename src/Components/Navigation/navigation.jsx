import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";

//icons
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import PeopleIcon from "@material-ui/icons/People";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
//for navigation
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Header(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  //navigation function
  let history = useHistory();

  const changePage = (name) => {
    if (name == "Home") {
      history.push("/");
    } else if (name == "Business") {
      history.push("/business");
    } else if (name == "Users") {
      history.push("/users");
    } else if ((name == "Queries")) {
      history.push("/queries");
    }
    else if((name =="Access")){
      history.push("/accesspanel")
    }
    
  };
  //signout function
  const signoutFun = () => {
    dispatch(logout());
    
  };
  const manageBack=()=>{
    console.log(history);
    window.history.back()
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Hidden smDown>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          </Hidden>
          <Hidden lgUp>
         {
          history.location.pathname!=="/"?(<IconButton
            color="inherit"
            aria-label="open drawer"
             onClick={manageBack}
            edge="start"
          >
            <ArrowBackIosIcon />
          </IconButton>):null
         }
          </Hidden>
          <Typography variant="h6" noWrap className={classes.title}>
            Admin Panel
          </Typography>

          <Button color="inherit" onClick={signoutFun}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Hidden smDown>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Home", "Business", "Users", "Queries","Access"].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                changePage(text);
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <HomeRoundedIcon />
                ) : index === 1 ? (
                  <BusinessCenterIcon />
                ) : index === 2 ? (
                  <PeopleIcon />
                ) : index === 3 ? (
                  <LiveHelpIcon />
                ):index===4?(
                  <SupervisedUserCircleIcon/>
                ) : (
                  <PeopleIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
