import React from "react";
import { NavLink } from "react-router-dom";

function PageNotFound(props) {
  return (
    <div>
      <p> 404 Page Not Found </p>
      <NavLink to="/" exact>
        Come Back Go Home
      </NavLink>
    </div>
  );
}

export default PageNotFound;
