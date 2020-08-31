import {
  GET_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  DETAIL_VIEW,
  EDIT_LEAD,
  CLEAR_STATE,
} from "../actions/types";

export const initialState = {
  leads: [],
  lead: [],
};

export default function (state = initialState, action) {
  // console.log(action.id);

  switch (action.type) {
    // case DETAIL_VIEW:
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
        lead: [],
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload],
      };
    case EDIT_LEAD:
      return {
        ...state,
        lead: [],
        lead: [state.lead, action.payload],
      };
    case DETAIL_VIEW:
      return {
        ...state,
        lead: state.leads.filter((lead) => lead.id === action.payload),
      };
    case CLEAR_STATE:
      return {
        ...state,
        leads: [],
        lead: [],
      };

    default:
      return state;
  }
}
