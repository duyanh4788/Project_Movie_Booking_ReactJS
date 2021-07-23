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
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListMovieManagement,
  getInfoMovie,
  getListMovieManagement,
  showFormMovie,
} from "../../store/actions/movieManagement.action";
import * as dayjs from "dayjs";
import FormEditMovie from "./FormEditMovie";
import FormAddMovie from "./FormAddMovie";

export default function MovieManagement() {
  const dispatch = useDispatch();

  const [maNhom, setStateMaNhom] = useState("GP01");
  const [search, setStateSearch] = useState("");

  const movieList = useSelector((state) => {
    return state.MovieManagementReducer.movieList;
  });
  const pageFormAdd = useSelector((state) => {
    return state.MovieManagementReducer.pageFormAdd;
  });

  useEffect(() => {
    dispatch(getListMovieManagement(maNhom));
  }, [maNhom, dispatch]);

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

  const deletePhim = (maPhim) => {
    dispatch(deleteListMovieManagement(maPhim));
  };
  const editPhim = (infoPhim) => {
    dispatch(getInfoMovie(infoPhim));
    dispatch(showFormMovie("editMovie"));
  };
  const themPhim = () => {
    dispatch(showFormMovie("addMovie"));
  };

  return (
    <>
      {pageFormAdd === "editMovie" ? (
        <FormEditMovie />
      ) : pageFormAdd === "addMovie" ? (
        <FormAddMovie />
      ) : (
        <>
          <div className="formMovie">
            <h5>Danh Sách Phim</h5>
            <span>Mã Nhóm : </span>
            <select
              onChange={(e) => {
                setStateMaNhom(e.target.value);
              }}
            >
              {renderMaNhom()}
            </select>
            <button type="button" onClick={themPhim}>
              Thêm Phim
            </button>
            <input
              className="inputSearch"
              type="text"
              placeholder="Tìm Tên Phim"
              onChange={(e) => {
                setStateSearch(e.target.value);
              }}
            />
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã Phim</TableCell>
                  <TableCell>Tên Phim</TableCell>
                  <TableCell>Ngày Chiếu</TableCell>
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
                  ?.filter((itemF) => {
                    if (search === "") {
                      return itemF;
                    } else if (
                      itemF.tenPhim
                        .toLocaleLowerCase()
                        .match(search.toLocaleLowerCase())
                    ) {
                      return itemF;
                    }
                    return false;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.maPhim}</TableCell>
                      <TableCell>{item.tenPhim}</TableCell>
                      <TableCell>
                        {dayjs(item.ngayKhoiChieu).format("MM-DD-YYYY HH:MM")}
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
        </>
      )}
    </>
  );
}
