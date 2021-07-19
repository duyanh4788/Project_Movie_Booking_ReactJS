import React from "react";
// redux hook
import { useDispatch } from "react-redux";
// redux thunk action
import { signOut_Action } from "../../store/actions/signIn.action";
//react-router
import { useHistory } from "react-router";
// material-ui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// css
import { withStyles } from "@material-ui/core/styles";
import "./css/infoUser.style.css";

// style component
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
// style component
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function InfoUser(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  // get data to localstorage have save form action/signIn_Action
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/signIn");
    dispatch(signOut_Action()); // post action to action/signIn.action
  };
  const showProfile = () => {
    history.push("/profile");
  };
  return (
    <>
      <p className="textignOut">
        Hi {userLogin && userLogin.hoTen} !
        <ExpandMoreIcon
          onClick={handleClick}
          style={{ verticalAlign: "middle", cursor: "pointer" }}
        />
      </p>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={showProfile}>
          <AccountCircleIcon className="textignOut" />
          <p className="textignOut">Profile</p>
        </StyledMenuItem>
        <StyledMenuItem onClick={logOut}>
          <ExitToAppIcon className="textignOut" />
          <p className="textignOut">Log Out</p>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

export default InfoUser;
