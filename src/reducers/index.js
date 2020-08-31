import { combineReducers } from "redux";
import leads from "./leads";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import module from "./module";
import checkout from "./checkout";

export default combineReducers({
  auth,
  leads,
  errors,
  messages,
  module,
  checkout,
});
