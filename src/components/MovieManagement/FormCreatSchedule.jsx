import React, { useEffect, useState } from "react";
import "./scss/FormCreatSchedule.css";
import { useDispatch, useSelector } from "react-redux";
import {
  creatScheduleMovie,
  getCumRapCinemaManagement,
  hiddenFormMovie,
} from "../../store/actions/movieManagement.action";
import { makeStyles } from "@material-ui/core/styles";
import format from "date-format";
import { Container, Grid, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
// snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  select: {
    padding: "0 5px",
  },
  label: {
    fontSize: "8px",
  },
});

function FormCreatSchedule() {
  const classes = useStyles();
  const dispatch = useDispatch();

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
  // snackbar

  // show status
  const statusCode = useSelector(
    (state) => state.MessageSnackbarReducer.statusCode
  );
  const errorMessage = useSelector(
    (state) => state.MessageSnackbarReducer.errorMessage
  );
  // show status
  useEffect(() => {
    if (statusCode === 500 || statusCode === 200) {
      handleClick();
    }
  }, [statusCode]);

  // select
  // maHeThongRap
  const [openCinema, setOpenCinema] = React.useState(false);
  const handleCloseCinema = () => {
    setOpenCinema(false);
  };
  const handleOpenCinema = () => {
    setOpenCinema(true);
  };
  // cumRap
  const [openCumRap, setOpenCumRap] = React.useState(false);
  const handleCloseCumRap = () => {
    setOpenCumRap(false);
  };
  const handleOpenCumRap = () => {
    setOpenCumRap(true);
  };
  // maRap
  const [openMaRap, setOpenMaRap] = React.useState(false);
  const handleCloseMaRap = () => {
    setOpenMaRap(false);
  };
  const handleOpenMaRap = () => {
    setOpenMaRap(true);
  };
  // select

  const maPhim = useSelector((state) => {
    return state.MovieManagementReducer.maPhim;
  });
  const codeCinema = useSelector((state) => {
    return state.MovieManagementReducer.codeCinema;
  });
  const codeCumRap = useSelector((state) => {
    return state.MovieManagementReducer.codeCumRap;
  });
  const [cinema, setCinema] = useState({
    codeCinema: "",
    codeCumRap: "",
  });

  const [creatMovie, setCreatMovie] = useState({
    maPhim: maPhim,
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: "",
  });

  const [validMovie] = useState({
    maPhim: "",
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: "",
  });

  const [validSubmit, setValidSubmit] = useState(true);

  useEffect(() => {
    validButtonSubmit();
  });

  const handleChangeCodeCineMa = (e) => {
    const { value } = e.target;
    setCinema({ ...cinema, codeCinema: value });
    dispatch(getCumRapCinemaManagement(value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreatMovie({ ...creatMovie, [name]: value });
  };

  const handleChangeDateTime = (e) => {
    let dateFormat = format("dd/MM/yyyy hh:mm:ss", new Date(e.target.value));
    setCreatMovie({ ...creatMovie, ngayChieuGioChieu: dateFormat });
  };

  const validButtonSubmit = () => {
    let valid = true;
    for (let key in validMovie) {
      if (validMovie[key] !== "" || creatMovie[key] === "") {
        valid = false;
      }
    }
    setValidSubmit(valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(creatScheduleMovie(creatMovie));
  };

  const hidenFormMovie = () => {
    dispatch(hiddenFormMovie("listUser"));
    dispatch(setDataErrorToZero(0));
  };

  const renderCodeCinema = () => {
    return codeCinema.map((item, index) => {
      return (
        <MenuItem key={index} value={item.maHeThongRap}>
          {item.maHeThongRap}
        </MenuItem>
      );
    });
  };

  const renderCodeCumRap = () => {
    return codeCumRap.map((item, index) => {
      return (
        <MenuItem key={index} value={item.maCumRap}>
          {item.tenCumRap}
        </MenuItem>
      );
    });
  };

  const renderMaRap = () => {
    let index = codeCumRap.findIndex(
      (item) => item.maCumRap === cinema.codeCumRap
    );
    if (index !== -1) {
      return codeCumRap[index].danhSachRap.map((item, index) => {
        return (
          <MenuItem key={index} value={item.maRap}>
            {item.tenRap} - Mã : {item.maRap}
          </MenuItem>
        );
      });
    }
  };

  return (
    <div className="backgroundCreatSchedule">
      <div className="wrapCreatSchedule">
        <Container maxWidth="md">
          <h4>Tạo Lịch Chiếu</h4>
          <form onSubmit={handleSubmit}>
            <div className="formCreat">
              <label>Mã Phim</label>
              <input
                onChange={handleChange}
                value={creatMovie.maPhim}
                disabled
                type="text"
              />
              <span className="spanValid">{validMovie.maPhim}</span>
            </div>

            <div className="formCreat">
              <label>Ngày Khởi Chiếu</label>
              <br />
              <TextField
                id="datetime-local"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeDateTime}
                defaultValue={creatMovie.ngayChieuGioChieu}
                name="ngayChieuGioChieu"
                className="dateTimer"
              />
              <span className="spanValid">{validMovie.ngayChieuGioChieu}</span>
            </div>

            <div className="formCreat">
              <label>Mã Rạp Phim</label>
              <input
                value={creatMovie.maRap}
                onChange={handleChange}
                disabled
                type="number"
              />
              <Grid container>
                <Grid item lg={4} className={classes.select}>
                  <InputLabel style={{ fontSize: "10px" }}>Rạp</InputLabel>
                  <Select
                    open={openCinema}
                    onClose={handleCloseCinema}
                    onOpen={handleOpenCinema}
                    onChange={handleChangeCodeCineMa}
                    value={cinema.codeCinema}
                    name="codeCinema"
                    className="selectCodeCinema"
                  >
                    {renderCodeCinema()}
                  </Select>
                </Grid>
                <Grid item lg={4} className={classes.select}>
                  <InputLabel style={{ fontSize: "10px" }}>Cụm Rạp</InputLabel>
                  <Select
                    open={openCumRap}
                    onClose={handleCloseCumRap}
                    onOpen={handleOpenCumRap}
                    onChange={(e) => {
                      setCinema({ ...cinema, codeCumRap: e.target.value });
                    }}
                    value={cinema.codeCumRap}
                    className="selectCodeCinema"
                  >
                    {renderCodeCumRap()}
                  </Select>
                </Grid>
                <Grid item lg={4} className={classes.select}>
                  <InputLabel style={{ fontSize: "10px" }}>Mã Rạp</InputLabel>
                  <Select
                    open={openMaRap}
                    onClose={handleCloseMaRap}
                    onOpen={handleOpenMaRap}
                    onChange={handleChange}
                    value={creatMovie.maRap}
                    name="maRap"
                    className="selectCodeCinema"
                  >
                    {renderMaRap()}
                  </Select>
                </Grid>
              </Grid>
              <span className="spanValid">{validMovie.maRap}</span>
            </div>

            <div className="formCreat">
              <label>Giá Vé</label>
              <input value={creatMovie.giaVe} disabled type="number" />

              <FormLabel>Chọn Giá Vé : </FormLabel>
              <RadioGroup
                name="giaVe"
                value={creatMovie.giaVe}
                onChange={handleChange}
                row
                aria-label="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="75000"
                  control={<Radio color="default" />}
                  label="75.000"
                />
                <FormControlLabel
                  value="120000"
                  control={<Radio color="default" />}
                  label="120.000"
                />
                <FormControlLabel
                  value="150000"
                  control={<Radio color="default" />}
                  label="150.000"
                />
                <FormControlLabel
                  value="180000"
                  control={<Radio color="default" />}
                  label="180.000"
                />
              </RadioGroup>
              <span className="spanValid">{validMovie.giaVe}</span>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                style={{ cursor: "pointer", color: "red" }}
                onClick={hidenFormMovie}
              >
                Trở Lại
              </button>
              {validSubmit ? (
                <button
                  type="submit"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  Tạo Lịch Chiếu
                </button>
              ) : (
                <button disabled style={{ cursor: "no-drop" }}>
                  Tạo Lịch Chiếu
                </button>
              )}
            </div>
          </form>
        </Container>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        {statusCode === 200 ? (
          <Alert onClose={handleClose} severity="success">
            Tạo Lịch Chiếu Thành Công
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}

export default FormCreatSchedule;
