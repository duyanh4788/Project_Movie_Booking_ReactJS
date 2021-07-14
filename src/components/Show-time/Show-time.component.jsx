import React, { memo } from "react";
// redux hook
import { useSelector } from "react-redux";
// react router dom
import { Link } from "react-router-dom";
// material ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// format dd-mm-yy
import format from "date-format";
// css material ui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Showtimecomponent(props) {
  const classes = useStyles();

  const showTimeList = useSelector((state) => {
    return state.detaiMovielReducer.detail?.lichChieu; // get data to detaiMovielReducer
  });
  console.log("showtimelist", showTimeList);
  const renderShowTime = () => {
    return showTimeList?.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.thongTinRap.tenHeThongRap}</TableCell>
          <TableCell>{item.thongTinRap.tenCumRap}</TableCell>
          <TableCell>{item.giaVe}</TableCell>
          <TableCell>
            <Link to={`/bookingComponent/${item.maLichChieu}`}>
              {/*  Link (maLichChieu===showTimeCode) to Router to BookingComponent path="/bookingComponent/:showTimeCode" */}
              {format("dd-mm-yyyy hh:mm", new Date(item.ngayChieuGioChieu))}
            </Link>
          </TableCell>
        </TableRow>
      );
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Số Thứ Tự</TableCell>
            <TableCell>Tên Hệ Thống Rạp</TableCell>
            <TableCell>Ngày Chiếu</TableCell>
            <TableCell>Giá Vé</TableCell>
            <TableCell>Ngày Giờ Chiếu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderShowTime()}</TableBody>
      </Table>
    </TableContainer>
  );
}
export default memo(Showtimecomponent);
