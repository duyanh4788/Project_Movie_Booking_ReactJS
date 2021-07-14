import axios from "axios";

export const postSignUp_Action = {
  signUp(data) {// recive (data) to import client Sign-Up.page
    return axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      data,
    });
  },
};
