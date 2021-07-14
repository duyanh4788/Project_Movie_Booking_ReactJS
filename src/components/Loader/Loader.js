import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./scss/loading.css"
const Loader = (props) => {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default Loader;




// import React from 'react';
// import Skeleton from '@material-ui/lab/Skeleton';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   root: {
//     width: 300,
//     margin: "20px auto"
//   },
// });

// export default function Loader() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <Skeleton />
//       <Skeleton animation={false} />
//       <Skeleton animation="wave" />
//     </div>
//   );
// }


// import React, { Component } from "react";
// import { styled } from "./Loader.styles";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { withStyles } from "@material-ui/styles";
// import { connect } from "react-redux";

// class Loader extends Component {
//   render() {
//     const { classes, loading } = this.props;
//     // if (!loading) return null;
//     return (
//       <div className={classes.root}>
//         <CircularProgress />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   loading: state.detaiMovielReducer.loading,
// });
// export default connect(mapStateToProps)(withStyles(styled)(Loader));
