import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
  getListLengthMovieManagement,
  getListMovieDateManagement,
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
import Loader from "../Loader/Loader";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";
// snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Container, Grid, TextField } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

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
  // show status
  const statusCode = useSelector(
    (state) => state.MessageSnackbarReducer.statusCode
  );
  const errorMessage = useSelector(
    (state) => state.MessageSnackbarReducer.errorMessage
  );
  // snackbar
  const pageFormAdd = useSelector((state) => {
    return state.MovieManagementReducer.pageFormAdd;
  });
  // page
  const [page, setPage] = React.useState(1);
  // row page
  const [stateRowsPage, setRowsPage] = useState({
    page: "5",
  });
  //search
  const [stateSearch, setSearch] = useState({
    search: "",
  });
  //search Quick
  const [stateSearchQuick, setSearchQuicl] = useState({
    search: "",
  });
  // get maNhom
  const [stateMaNhom, setMaNhom] = useState({
    maNhom: "GP01",
  });
  // get date
  const [stateSince, setSince] = useState({
    dateSince: "",
  });
  // get date
  const [stateToThatDay, setToThatDay] = useState({
    dateDay: "",
  });
  // set snackbar
  useEffect(() => {
    if (statusCode === 200 || statusCode === 500) {
      handleClick();
    }
  }, [statusCode]);
  // cal api code cinema use FormCreatSchedule
  useEffect(() => {
    dispatch(getCodeCinemaMovieManagement());
  }, [dispatch]);
  // get lenght movielist
  useEffect(() => {
    dispatch(getListLengthMovieManagement(stateMaNhom.maNhom));
  }, [dispatch, stateMaNhom.maNhom, pageFormAdd]);
  // call api get list movie pagination
  useEffect(() => {
    if (stateSearch.search === "") {
      dispatch(
        getListMovieManagement(stateMaNhom.maNhom, page, stateRowsPage.page)
      );
    }
  }, [
    dispatch,
    pageFormAdd,
    stateMaNhom.maNhom,
    page,
    stateRowsPage.page,
    stateSearch.search,
  ]);
  // call api search movie
  useEffect(() => {
    if (stateSearchQuick.search !== "") {
      dispatch(
        getListMovieSearchManagement(
          stateMaNhom.maNhom,
          stateSearchQuick.search,
          page,
          stateRowsPage.page
        )
      );
    }
  }, [
    dispatch,
    stateMaNhom.maNhom,
    stateSearchQuick.search,
    page,
    stateRowsPage.page,
  ]);
  // show loading
  const loading = useSelector((state) => state.CommonReducer.loading);
  // get data reducer
  const movieListLength = useSelector((state) => {
    return state.MovieManagementReducer.movieListLength;
  });
  // set maNhom
  const handleMaNhom = (e) => {
    const { value } = e.target;
    setMaNhom({ ...stateMaNhom, maNhom: value });
    setSearch({ ...stateSearch, search: "" });
    setSince({ ...stateSince, dateSince: "" });
    setToThatDay({ ...stateToThatDay, dateDay: "" });
    dispatch(setDataErrorToZero(0));
    movieListDate.length = 0;
    setPage(1);
  };
  // set search
  const handleSearch = (e) => {
    setSearch({ ...stateSearch, search: e.target.value });
    movieListDate.length = 0;
  };
  const handleSearchQuick = (e) => {
    setSearchQuicl({ ...stateSearchQuick, search: e.target.value });
    movieListDate.length = 0;
  };
  // set date
  const handleSince = (e) => {
    setSince({ ...stateSince, dateSince: e.target.value });
  };
  const handleToDay = (e) => {
    setToThatDay({ ...stateToThatDay, dateDay: e.target.value });
  };
  // setpage
  const handleChangePage = (event, value) => {
    setPage(value);
    dispatch(setDataErrorToZero(0));
  };
  const handleRowPage = (e) => {
    setRowsPage({ ...stateRowsPage, page: e.target.value });
    setPage(1);
  };
  //  btn tim phim
  const movieListDate = useSelector((state) => {
    return state.MovieManagementReducer.movieListDate;
  });
  const timPhimTheoNgay = () => {
    let dateSince = dayjs(stateSince.dateSince).format("DD/MM/YYYY");
    let dateDay = dayjs(stateToThatDay.dateDay).format("DD/MM/YYYY");
    dispatch(
      getListMovieDateManagement(
        stateMaNhom.maNhom,
        stateSearch.search,
        page,
        stateRowsPage.page,
        dateSince,
        dateDay
      )
    );
    handleClick();
    if (movieListDate.length > 0) {
      dispatch(setDataErrorToZero(0));
    }
  };
  const movieList = useSelector((state) => {
    return state.MovieManagementReducer.movieList;
  });
  // delete
  const deletePhim = (maPhim) => {
    dispatch(deleteListMovieManagement(maPhim));
    handleClick();
  };
  // edit
  const editPhim = (infoPhim) => {
    dispatch(getInfoMovie(infoPhim));
    dispatch(setDataErrorToZero(0));
    dispatch(showFormMovie("editMovie"));
  };
  // add
  const themPhim = () => {
    dispatch(setDataErrorToZero(0));
    dispatch(showFormMovie("addMovie"));
  };
  // tạo lịch chiếu
  const creatSchedule = (maPhim) => {
    dispatch(getMaPhimMovieManagement(maPhim));
    dispatch(setDataErrorToZero(0));
    dispatch(showFormMovie("creatSchedule"));
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
  // render {? }
  return loading ? (
    <Loader />
  ) : (
    <>
      {pageFormAdd === "editMovie" ? (
        <div className="editMovie">
          <FormEditMovie />
        </div>
      ) : pageFormAdd === "addMovie" ? (
        <div className="addMovie">
          <FormAddMovie maNhom={stateMaNhom.maNhom} />
        </div>
      ) : pageFormAdd === "creatSchedule" ? (
        <div className="creatSchedule">
          <FormCreatSchedule />
        </div>
      ) : (
        <>
          <TableContainer>
            <Table aria-label="simple table" className="formMovie">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span>Chọn Nhóm : </span>
                    <select
                      name="maNhom"
                      value={stateMaNhom.maNhom}
                      onChange={handleMaNhom}
                    >
                      {renderMaNhom()}
                    </select>
                  </TableCell>
                  <TableCell>
                    <input
                      className="inputSearch"
                      type="text"
                      placeholder="Tìm Phim Nhanh API"
                      name="search"
                      value={stateSearchQuick.search}
                      onChange={handleSearchQuick}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      className="inputSearch"
                      type="text"
                      placeholder="Tìm Phim Theo Ngày API"
                      name="search"
                      value={stateSearch.search}
                      onChange={handleSearch}
                    />
                  </TableCell>
                  <TableCell>
                    <span>
                      Từ{" "}
                      <TextField
                        id="date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="dateTimer"
                        value={stateSince.dateSince}
                        onChange={handleSince}
                      />{" "}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>
                      Đến{" "}
                      <TextField
                        id="date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="dateTimer"
                        value={stateToThatDay.dateDay}
                        onChange={handleToDay}
                      />
                    </span>
                  </TableCell>
                  <TableCell>
                    {stateSearch.search === "" ? (
                      <button
                        type="button"
                        disabled
                        style={{ cursor: "no-drop" }}
                      >
                        Tìm Phim
                      </button>
                    ) : (
                      <button type="button" onClick={timPhimTheoNgay}>
                        Tìm Phim
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    {movieListDate.length > 0 ? (
                      <span>Đã Tìm Thấy {movieListDate.length} Phim</span>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <div className="titleMovieManagement">
            <h5>Danh Sách Phim</h5>
            <button className="btnThemPhim" onClick={themPhim}>
              Thêm Phim
            </button>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" className="tableMove">
              <TableHead>
                <TableRow>
                  <TableCell>Mã Phim</TableCell>
                  <TableCell>Tên Phim</TableCell>
                  <TableCell>Ngày Chiếu</TableCell>
                  <TableCell>Giờ Chiếu</TableCell>
                  <TableCell>Hình Ảnh</TableCell>
                  <TableCell>Trailer</TableCell>
                  <TableCell>Mô Tả</TableCell>
                  <TableCell>Cài Đặt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movieList?.map((item, index) => {
                  let setLink = item.hinhAnh.split(":");
                  let urlImg = setLink[0] + "s:" + setLink[1];
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.maPhim}</TableCell>
                      <TableCell>{item.tenPhim}</TableCell>
                      <TableCell>
                        {dayjs(item.ngayKhoiChieu).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(item.ngayKhoiChieu).format("HH:MM")}
                      </TableCell>
                      <TableCell>
                        <img
                          src={urlImg}
                          alt={urlImg}
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
                  );
                })}
              </TableBody>
            </Table>
            {movieListDate.length > 0 ? (
              ""
            ) : (
              <Container maxWidth="md" className="pagination">
                <Grid container>
                  <Grid item lg={4}>
                    <span> Rows per page : </span>
                    <select
                      name="stateRowsPage"
                      onChange={handleRowPage}
                      value={stateRowsPage.page}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                  </Grid>
                  <Grid item lg={8}>
                    <Pagination
                      count={
                        parseInt(movieListLength.length / stateRowsPage.page) +
                        1
                      }
                      showFirstButton
                      showLastButton
                      page={page}
                      onChange={handleChangePage}
                    />
                  </Grid>
                </Grid>
              </Container>
            )}
          </TableContainer>
          {statusCode === 200 ? (
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Thành Công
              </Alert>
            </Snackbar>
          ) : statusCode === 500 ? (
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          ) : null}
        </>
      )}
    </>
  );
}
