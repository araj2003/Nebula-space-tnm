import { API_URL } from "../../api";
import {
  DAILY_ESSENTIALS_TYPE_LOAD_FAIL,
  DAILY_ESSENTIALS_TYPE_LOAD_REQUEST,
  DAILY_ESSENTIALS_TYPE_LOAD_SUCCESS,
} from "../../constants/categories/dailyEssentialsConstants";
import axios from "axios";
axios.defaults.withCredentials = true;

export const dailyEssentialsTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: DAILY_ESSENTIALS_TYPE_LOAD_REQUEST });
  try {
    const categoryId = "64d3c5f84a2a02e581fd9b1b"; // Replace with the actual category ID
    const { data } = await axios.get(`${API_URL}/category/${categoryId}`);

    dispatch({
      type: DAILY_ESSENTIALS_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DAILY_ESSENTIALS_TYPE_LOAD_FAIL,
      payload: error.response ? error.response.data.error : "Newtwork Error",
    });
  }
};
