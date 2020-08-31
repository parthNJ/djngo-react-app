import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import {
  GET_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  DETAIL_VIEW,
  EDIT_LEAD,
  CLEAR_LEAD,
} from "./types";

import { tokenConfig } from "./auth";

//GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/lead/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//DELETE LEADS
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/lead/${id}/`, tokenConfig(getState))
    .then((res) => {
      //first dispatch for success message if deleted
      dispatch(createMessage({ deleteLead: "Lead Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

//ADD LEADS
export const addLead = (lead) => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/lead/", lead, tokenConfig(getState))
    .then((res) => {
      //first dispatch for success adding a lead
      dispatch(createMessage({ addedLead: "Successfully Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Detail Lead
export const leadDetail = (id) => (dispatch, getState) => {
  axios
    .get(`http://localhost:8000/api/lead/${id}/`, tokenConfig(getState))
    .then((res) => {
      // dispatch(createMessage({ Loading: "Loading" }));
      dispatch({
        type: DETAIL_VIEW,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Edit Lead
export const editLead = (id, lead) => (dispatch, getState) => {
  axios
    .put(`http://localhost:8000/api/lead/${id}/`, lead, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ editLeadSuccess: "Successfully updated" }));
      dispatch({
        type: EDIT_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
