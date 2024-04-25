import {
    GET_VARIETY_DETAILS_REQUEST,
    GET_VARIETY_DETAILS_SUCCESS,
    GET_VARIETY_DETAILS_FAILURE,
  } from '../constants/varietiesConstant';
  
  
  const varietyReducer = (state={ variety: {}},action) => {
    switch (action.type) {
      case GET_VARIETY_DETAILS_REQUEST:
        return {
            loading:true,
            ...state,
        };
      case GET_VARIETY_DETAILS_SUCCESS:
        return {
            loading:false,
            variety:action.payload,
        };
      case GET_VARIETY_DETAILS_FAILURE:
        return {
            loading:false,
            error:action.payload,
        };
      default:
        return state;
    }
  };
  
  export default varietyReducer;
  