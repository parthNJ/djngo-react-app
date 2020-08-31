import React, { Fragment } from "react";
import Form from "./Form";
import Leads from "./Leads";

function Dashboard() {
  return (
    <Fragment>
      <Leads />
      <Form />
    </Fragment>
  );
}

export default Dashboard;
