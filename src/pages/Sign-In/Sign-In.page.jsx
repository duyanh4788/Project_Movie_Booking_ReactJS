import React, { useState } from "react";
import "./scss/signIn.css";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// action redux thunk
import { signIn_Action } from "../../store/actions/signIn.action";
// react router dom
import { useHistory } from "react-router-dom";
// material
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
// styled materiall
import { withStyles } from "@material-ui/styles";
import { styled } from "./Sign-In.style";
// modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
/**
 * localStorage save signIn.action
 */

function SignInPage(props) {
  const { classes } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const hanldeSubmit = (event) => {
    event.preventDefault(); // lock submit
    setOpen(true); // open modal
    dispatch(signIn_Action(user, history)); // post data ( user => client impot , history =>  use to navigate ) up axios action/signIn.action
  };

  const hanldeChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value }); // es6 object literal
  };

  // modal
  const errMesage = useSelector((state) => {
    return state.signInReducer.errMesage;
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  // modal

  return (
    <Container>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={hanldeSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Tài Khoản"
                name="taiKhoan"
                value={user.taiKhoan}
                autoComplete="email"
                autoFocus
                onChange={hanldeChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="matKhau"
                label="Mật Khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.matKhau}
                onChange={hanldeChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modalTitle">
            <p>{errMesage}</p>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

export default withStyles(styled)(SignInPage);
