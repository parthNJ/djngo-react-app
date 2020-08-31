import React from "react";
import "../../assets/css/sb-admin-2.min.css";
import "../../assets/css/pp_style.css";

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Right_content from "./Right_content";

function Main_dashboard() {
  return (
    <div id="wrapper">
      <Sidebar />
      <Right_content />
    </div>
  );
}

export default Main_dashboard;
