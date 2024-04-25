/**
 * Action to load medical care types.
 * It states that the function is responsible for loading medical care types and returns a promise. The function expects a dispatch function from Redux as a parameter. It also specifies that the function is asynchronous.
 *
 * @function medicalCareTypeLoadAction
 * @async
 * @param {function} dispatch - Redux dispatch function.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while loading medical care types.
 */

import { API_URL } from "../../api";
import axios from "axios";
import {
  MEDICAL_CARE_TYPE_LOAD_FAIL,
  MEDICAL_CARE_TYPE_LOAD_REQUEST,
  MEDICAL_CARE_TYPE_LOAD_SUCCESS,
} from "../../constants/categories/medicalCareConstants";
axios.defaults.withCredentials = true;

export const medicalCareTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: MEDICAL_CARE_TYPE_LOAD_REQUEST });
  try {
    const categoryId = "64d3c5f94a2a02e581fd9b1d";
    const { data } = await axios.get(
      `${API_URL}/category/${categoryId}`
    );
    dispatch({
      type: MEDICAL_CARE_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEDICAL_CARE_TYPE_LOAD_FAIL,
      payload: error.response ? error.response.data.error : "Newtwork Error",
    });
  }
};
