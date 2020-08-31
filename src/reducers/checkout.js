import {
  CHECKOUT_START,
  CHECKOUT_FAIL,
  PURCHASE_PROGRAM,
} from "../actions/types";
import Immutable from "immutable";

const initialState = {
  isCheckingOut: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
