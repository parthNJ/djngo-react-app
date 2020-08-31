import axios from "axios";
import { PURCHASE_PROGRAM, EMPTY_CART } from "./types";
import { tokenConfig } from "./auth";
import { createMessage, returnErrors } from "./messages";

//START CHECKOUT

//Enroll in Program - FROM CART TO ORDERED
export const checkout = (orderInfo) => (dispatch, getState) => {
  const userID = getState().auth.user.id;

  const priceArry = Object.values(
    getState().module.user_program.map((program) => program.program.cost)
  );
  const totalCost = priceArry.reduce((a, b) => a + b, 0);

  const users_current_programs = getState().module.user_program.map(
    (program) => program.program.id
  );
  if (
    users_current_programs.length <= 0 ||
    users_current_programs == undefined
  ) {
    dispatch(createMessage({ NothingInCart: "Please Add Something to Cart!" }));
    // console.log("Nothing in cart");
  } else {
    users_current_programs.map((Program) => {
      const purchase_program = {
        user: userID,
        program: Program,
        total: totalCost,
        address: orderInfo.address,
        city: orderInfo.city,
        state: orderInfo.state,
        zipcode: orderInfo.zipcode,
      };
      // console.log(purchase_program);
      axios
        .post(
          "http://localhost:8000/api/purchased-program/",
          purchase_program,
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch({
            type: PURCHASE_PROGRAM,
            payload: res.data,
          });
          dispatch(createMessage({ addedLead: "Successfully Purchased" }));
        })
        .catch((err) =>
          dispatch(returnErrors(err.response.data, err.response.status))
        );
    });
  }
};

//empty cart
export const emptyCart = () => (dispatch, getState) => {
  const users_current_programs = getState().module.user_program.map(
    (program) => program.id
  );

  users_current_programs.map((Program) => {
    axios
      .delete(
        `http://localhost:8000/api/userProgram/${Program}`,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: EMPTY_CART,
        });
      });
  });
};
