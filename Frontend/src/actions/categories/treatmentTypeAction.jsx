/**
 * Action to load treatment types.
 *
 * @function treatmentTypeLoadAction
 * @async
 * @param {function} dispatch - The Redux dispatch function used to dispatch actions.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while loading treatment types.
 *
 * @description This action is responsible for loading treatment types from the API.
 * It dispatches three different actions based on the API request status: TREATMENT_TYPE_LOAD_REQUEST,
 * TREATMENT_TYPE_LOAD_SUCCESS, and TREATMENT_TYPE_LOAD_FAIL.
 * - TREATMENT_TYPE_LOAD_REQUEST: Dispatched when the request is initiated.
 * - TREATMENT_TYPE_LOAD_SUCCESS: Dispatched when the request is successful with the loaded treatment types.
 * - TREATMENT_TYPE_LOAD_FAIL: Dispatched when the request fails with the error message.
 **/

import { API_URL } from "../../api";
import {
  TREATMENT_TYPE_LOAD_FAIL,
  TREATMENT_TYPE_LOAD_REQUEST,
  TREATMENT_TYPE_LOAD_SUCCESS,
} from "../../constants/categories/treatmentTypeConstant";
import axios from "axios";
axios.defaults.withCredentials = true;

export const treatmentTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: TREATMENT_TYPE_LOAD_REQUEST });
  try {
    const categoryId = "64d3c5f94a2a02e581fd9b1f";
    const { data } = await axios.get(`${API_URL}/category/${categoryId}`);

    dispatch({
      type: TREATMENT_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TREATMENT_TYPE_LOAD_FAIL,
      payload: error.response ? error.response.data.error : "Newtwork Error",
    });
  }
};
