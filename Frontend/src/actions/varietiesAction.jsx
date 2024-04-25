import { GET_VARIETY_DETAILS_FAILURE, GET_VARIETY_DETAILS_REQUEST, GET_VARIETY_DETAILS_SUCCESS } from "../constants/varietiesConstant";
import axios from 'axios'
axios.defaults.withCredentials = true;

/**
 * Action to get the details of a specific variety.
 *
 * @function getVarietyDetails
 * @async
 * @param {string} varietyId - The ID of the variety to retrieve details for.
 * @returns {Promise} - A promise that resolves with the variety details.
 *
 * @throws {Error} If there is an error while fetching the variety details.
 */
//get variety details
export const getVarietyDetails = (varietyId) => async (dispatch) => {
    try {
      dispatch({ type: GET_VARIETY_DETAILS_REQUEST });
  
     const { data } = await axios.get(`/api/v1/varieties/${varietyId}`)
      dispatch({
        type: GET_VARIETY_DETAILS_SUCCESS,
        payload: data.variety,
      });
    } catch (error) {
      dispatch({
        type: GET_VARIETY_DETAILS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };