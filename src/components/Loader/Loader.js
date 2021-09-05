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

