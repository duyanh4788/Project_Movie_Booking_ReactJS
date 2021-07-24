import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import "./scss/MovieManagement.css";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import TheatersIcon from "@material-ui/icons/Theaters";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListMovieManagement,
  getCodeCinemaMovieManagement,
  getInfoMovie,
  getListMovieManagement,
  getListMovieSearchManagement,
  getMaPhimMovieManagement,
  showFormMovie,
} from "../../store/actions/movieManagement.action";
import FormEditMovie from "./FormEditMovie";
import FormAddMovie from "./FormAddMovie";
// date format
import * as dayjs from "dayjs";
import FormCreatSchedule from "./FormCreatSchedule";
import { setUpdateSuccess } from "../../store/actions/clientManagement.action";
import Loader from "../Loader/Loader";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";
// snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MovieManagement() {
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

  const loading = useSelector((state) => state.CommonReducer.loading);

  const [stateMovie, setStateMovie] = useState({
    search: "",
    maNhom: "GP01",
  });
  const movieList = useSelector((state) => {
    return state.MovieManagementReducer.movieList;
  });
  const pageFormAdd = useSelector((state) => {
    return state.MovieManagementReducer.pageFormAdd;
  });
  const updateSuccess = useSelector((state) => {
    return state.MovieManagementReducer.updateSuccess;
  });
  // cal api code cinema use FormCreatSchedule
  useEffect(() => {
    dispatch(getCodeCinemaMovieManagement());
  }, [dispatch]);

  useEffect(() => {
    if (updateSuccess === 200) {
      dispatch(getListMovieManagement(stateMovie.maNhom));
    }
  }, [dispatch, updateSuccess, stateMovie.maNhom]);
  // call api list movie
  useEffect(() => {
    if (stateMovie.search === "") {
      dispatch(getListMovieManagement(stateMovie.maNhom));
    }
  }, [dispatch, stateMovie.maNhom, stateMovie.search]);

  // table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, movieList.length - page * rowsPerPage);
  // table
  // set data form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateMovie({ ...stateMovie, [name]: value });
  };
  const submitSearchMovie = (e) => {
    e.preventDefault();
    dispatch(
      getListMovieSearchManagement(stateMovie.maNhom, stateMovie.search)
    );
    if (stateMovie.search === "") {
      dispatch(getListMovieManagement(stateMovie.maNhom));
    }
  };
  // delete
  const deletePhim = (maPhim) => {
    handleClick();
    dispatch(deleteListMovieManagement(maPhim));
  };
  // edit
  const editPhim = (infoPhim) => {
    dispatch(getInfoMovie(infoPhim));
    dispatch(setUpdateSuccess(0));
    dispatch(setDataErrorToZero(0));
    dispatch(showFormMovie("editMovie"));
  };
  // add
  const themPhim = () => {
    dispatch(showFormMovie("addMovie"));
    dispatch(setDataErrorToZero(0));
  };
  // tạo lịch chiếu
  const creatSchedule = (maPhim) => {
    dispatch(getMaPhimMovieManagement(maPhim));
    dispatch(showFormMovie("creatSchedule"));
    dispatch(setDataErrorToZero(0));
  };
  // maNhom
  const renderMaNhom = () => {
    let arrMaNhom = [
      "GP01",
      "GP02 ",
      "GP03",
      "GP04 ",
      "GP05",
      "GP06 ",
      "GP07",
      "GP08 ",
      "GP09",
      "GP10 ",
    ];
    return arrMaNhom.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };
  // render
  return loading ? (
    <Loader />
  ) : (
    <>
      {pageFormAdd === "editMovie" ? (
        <FormEditMovie />
      ) : pageFormAdd === "addMovie" ? (
        <FormAddMovie />
      ) : pageFormAdd === "creatSchedule" ? (
        <FormCreatSchedule />
      ) : (
        <>
          <form onSubmit={submitSearchMovie} className="formMovie">
            <h5>Danh Sách Phim</h5>
            <span>Mã Nhóm : </span>
            <select
              name="maNhom"
              value={stateMovie.maNhom}
              onChange={handleChange}
            >
              {renderMaNhom()}
            </select>
            <button type="button" onClick={themPhim}>
              Thêm Phim
            </button>
            <input
              className="inputSearch"
              type="text"
              placeholder="Tìm Người Dùng API"
              name="search"
              value={stateMovie.search}
              onChange={handleChange}
            />
          </form>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" className="tableMove">
              <TableHead>
                <TableRow>
                  <TableCell>Mã Phim</TableCell>
                  <TableCell>Tên Phim</TableCell>
                  <TableCell>Ngày Chiếu</TableCell>
                  <TableCell>Giờ Chiếu</TableCell>
                  <TableCell>Nhóm</TableCell>
                  <TableCell>Đánh Giá</TableCell>
                  <TableCell>Bí Danh</TableCell>
                  <TableCell>Hình Ảnh</TableCell>
                  <TableCell>Trailer</TableCell>
                  <TableCell>Mô Tả</TableCell>
                  <TableCell>Cài Đặt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movieList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.maPhim}</TableCell>
                      <TableCell>{item.tenPhim}</TableCell>
                      <TableCell>
                        {dayjs(item.ngayKhoiChieu).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(item.ngayKhoiChieu).format("HH:MM")}
                      </TableCell>
                      <TableCell>{item.maNhom}</TableCell>
                      <TableCell>{item.danhGia}</TableCell>
                      <TableCell>{item.biDanh}</TableCell>
                      <TableCell>
                        <img
                          src={item.hinhAnh}
                          alt={item.hinhAnh}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell>{item.trailer.slice(0, 20)}</TableCell>
                      <TableCell>{item.moTa.slice(0, 20)}</TableCell>
                      <TableCell>
                        <DeleteOutlineRoundedIcon
                          className="iconDelete"
                          onClick={() => {
                            deletePhim(item.maPhim);
                          }}
                        />
                        <EditRoundedIcon
                          className="iconEdit"
                          onClick={() => {
                            editPhim(item);
                          }}
                        />
                        <TheatersIcon
                          className="iconCreat"
                          onClick={() => {
                            creatSchedule(item.maPhim);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={movieList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            {statusCode === 200 ? (
              <Alert onClose={handleClose} severity="success">
                Xoá Phim Thành Công
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="error">
                {errorMessage}
              </Alert>
            )}
          </Snackbar>
        </>
      )}
    </>
  );
}
