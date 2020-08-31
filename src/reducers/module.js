import {
  GET_PROGRAMS,
  ADD_PROGRAM,
  GET_USER_PROGRAMS,
  REMOVE_FROM_CART,
  PURCHASE_PROGRAM,
  EMPTY_CART,
  GET_ENROLLED_PROGRAM,
} from "../actions/types";

export const initialState = {
  programs: [],
  user_program: [],
  enrolled_program: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROGRAMS:
      return {
        ...state,
        programs: action.payload,
      };
    case GET_USER_PROGRAMS:
      return {
        ...state,
        user_program: action.payload,
      };
    case ADD_PROGRAM:
      return {
        ...state,
        user_program: [...state.user_program, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        user_program: state.user_program.filter(
          (program) => program.id !== action.payload
        ),
      };
    case GET_ENROLLED_PROGRAM:
      return {
        ...state,
        enrolled_program: action.payload,
      };

    case PURCHASE_PROGRAM:
      return {
        ...state,
        enrolled_program: [...state.enrolled_program, action.payload],
      };
    case EMPTY_CART:
      return {
        ...state,
        user_program: [],
      };
    default:
      return state;
  }
}
