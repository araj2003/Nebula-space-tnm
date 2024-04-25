// src/reducers/categoryReducer.js
import {
  CATEGORY_LOAD_REQUEST,
  CATEGORY_LOAD_SUCCESS,
  CATEGORY_LOAD_FAIL,
} from "../constants/categories/categoryConstants";

export const categoryReducer = (state = { categories: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case CATEGORY_LOAD_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LOAD_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case CATEGORY_LOAD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
