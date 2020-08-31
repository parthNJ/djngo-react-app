import axios from "axios";
import {
  GET_PROGRAMS,
  GET_USER_PROGRAMS,
  ADD_PROGRAM,
  REMOVE_FROM_CART,
  PURCHASE_PROGRAM,
  GET_ENROLLED_PROGRAM,
} from "./types";
import { tokenConfig } from "./auth";
import { createMessage, returnErrors } from "./messages";

//GET PROGRAMS
export const getPrograms = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/program/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PROGRAMS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//GET USER CART PROGRAMS
export const getUserPrograms = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/userProgram/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USER_PROGRAMS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ADD PROGRAM To Cart
export const addProgram = (programID) => (dispatch, getState) => {
  const userID = getState().auth.user.id;
  const users_cart_programs = getState().module.user_program.map(
    (program) => program.program.id
  );
  const user_purchased_program = getState().module.enrolled_program.map(
    (program) => program.program.id
  );
  const add_program_bool = users_cart_programs.includes(programID);
  const add_purchase_program_bool = user_purchased_program.includes(programID);
  if (add_purchase_program_bool === true) {
    dispatch(
      createMessage({
        alreadyEnrolled: "You are Currently Enrolled in this program",
      })
    );
  } else if (userID && add_program_bool === false) {
    const add_new_program = {
      program: programID,
      user: userID,
    };
    axios
      .post(
        "http://localhost:8000/api/userProgram/",
        add_new_program,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(
          createMessage({ ProgramAdded: "Program Successfully added to cart" })
        );
        dispatch({
          type: ADD_PROGRAM,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  } else {
    dispatch(createMessage({ alreadyInCart: "Already in Cart! " }));
  }
};

//REMOVE PROGRAM From cart
export const removeProgram = (programID) => (dispatch, getState) => {
  // console.log(programID);
  axios
    .delete(
      `http://localhost:8000/api/userProgram/${programID}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(
        createMessage({ deleteProgram: "Program Successfully Removed" })
      );
      dispatch({
        type: REMOVE_FROM_CART,
        payload: programID,
      });
    });
};

//GET USER ENROLLED PROGRAMS
export const enrolledPrograms = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/purchased-program/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ENROLLED_PROGRAM,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
