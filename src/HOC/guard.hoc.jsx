import React from "react";
import { Redirect } from "react-router";

function Guard(props) {
  // get data to localstorage have save form action/signIn_Action 
  const maLoaiNguoiDung = JSON.parse(localStorage.getItem("maLoaiNguoiDung"));
  return (
    <div>
      {maLoaiNguoiDung === "QuanTri" ? props.children : <Redirect to="/" />}
    </div>
  );
}

export default Guard;
