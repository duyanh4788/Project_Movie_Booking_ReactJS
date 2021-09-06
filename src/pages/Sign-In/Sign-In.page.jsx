import React, { useEffect, useState } from "react";
import "./scss/signIn.css";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// action redux thunk
import { signIn_Action } from "../../store/actions/signIn.action";
// react router dom
import { useHistory } from "react-router-dom";
// material
import { Container, Input } from "@material-ui/core";
// styled materiall
// modal
import Loader from "../../components/Loader/Loader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * localStorage save signIn.action
 */

function SignInPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    showPassword: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value }); // es6 object literal
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // snackbar
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // show status
  const statusCode = useSelector(
    (state) => state.MessageSnackbarReducer.statusCode
  );
  const errorMessage = useSelector(
    (state) => state.MessageSnackbarReducer.errorMessage
  );
  // show status
  useEffect(() => {
    if (statusCode === 500) {
      handleClick();
    }
  }, [statusCode]);
  // snackbar

  const hanldeSubmit = (event) => {
    event.preventDefault(); // lock submit
    dispatch(signIn_Action(user, history)); // post data ( user => client impot , history =>  use to navigate ) up axios action/signIn.action
    handleClick();
  };

  // loading
  const loading = useSelector((state) => {
    return state.CommonReducer.loading;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="backgroundSignIn">
          <div className="wrapLogin">
            <Container>
              <h5>Sign in</h5>
              <form noValidate onSubmit={hanldeSubmit}>
                <input
                  type="text"
                  placeholder="Tài Khoản"
                  name="taiKhoan"
                  value={user.taiKhoan}
                  onChange={handleChange}
                />
                <Input
                  id="standard-adornment-password"
                  className="inputShow"
                  name="matKhau"
                  type={user.showPassword ? "text" : "password"}
                  value={user.matKhau}
                  onChange={handleChange}
                  endAdornment={
                    <span
                      className="showPassWord"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {user.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </span>
                  }
                />
                <div style={{ textAlign: "center" }}>
                  <button type="submit">Đăng Nhập</button>
                </div>
              </form>
            </Container>
          </div>
        </div>
      )}
      {statusCode === 500 ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </>
  );
}

export default SignInPage;
