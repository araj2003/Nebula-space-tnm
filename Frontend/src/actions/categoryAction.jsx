// src/actions/categoryActions.js
import axios from "axios";

import { API_URL } from "../api";
import {
  CATEGORY_LOAD_REQUEST,
  CATEGORY_LOAD_SUCCESS,
  CATEGORY_LOAD_FAIL,
} from "../constants/categories/categoryConstants";

export const loadCategoryAction = () => async (dispatch) => {
  dispatch({ type: CATEGORY_LOAD_REQUEST });
  try {
    const { data } = await axios.get(`${API_URL}/category/all`);

    dispatch({
      type: CATEGORY_LOAD_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};
