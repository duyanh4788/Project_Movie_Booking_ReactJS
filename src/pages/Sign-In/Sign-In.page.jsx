import React, { useState } from "react";
// redux hook
import { useDispatch } from "react-redux";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
// styled materiall
import { withStyles } from "@material-ui/styles";
import { styled } from "./Sign-In.style";

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
    event.preventDefault();// lock submit
    dispatch(signIn_Action(user, history)); // post data ( user => client impot , history =>  use to navigate ) up axios action/signIn.action 
  };

  const hanldeChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value }); // es6 object literal
  };
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withStyles(styled)(SignInPage);
