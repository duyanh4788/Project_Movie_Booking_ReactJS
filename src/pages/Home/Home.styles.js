// jss cho phép viết css trong js
// jsx cho phép viết html trong js

/**
 * các bước trong css
 * 1. tạo biến style
 * 2. withStyles với component
 * 3. lấy props trong classes ra
 * 4. dùng classes cho các classname của component
 */
export const styled = {
  // key là tên class css : value là thuộc tính css
  myBtn: {
    backgroundColor: "#ff7543",
    "&:hover": {
      backgroundColor: "#ff9443",
    },
  },
  textIntro: {
    fontSize: '35px',
    margin: "10px 0",
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  }
};
