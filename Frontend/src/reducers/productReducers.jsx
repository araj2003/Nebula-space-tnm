import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_PRODUCT_DETAILS,

  //admin
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,

  //adimn end
  CLEAR_ERRORS,
  ALL_PRODUCT_NAME_REQUEST,
  ALL_PRODUCT_NAME_SUCCESS,
  ALL_PRODUCT_NAME_FAIL,
} from "../constants/productConstants";

//user and admin productsReducer to show all products
export const productsReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalProduct: action.payload.totalProduct,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // case ALL_PRODUCT_NAME_REQUEST:
    //   return {
    //     loading: true,
    //     products: [],
    //   };
    // case ALL_PRODUCT_NAME_SUCCESS:
    //   return {
    //     loading: false,
    //     products: action.payload.products,
    //     // handle other properties as needed...
    //   };
    // case ALL_PRODUCT_NAME_FAIL:
    //   return {
    //     loading: false,
    //     error: action.payload,
    //   };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: null,
      };
    default:
      return state;
  }
};

// export const productNameReducers = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case ALL_PRODUCT_NAME_REQUEST:
//       return {
//         loading: true,
//         products: [],
//       };
//     case ALL_PRODUCT_NAME_SUCCESS:
//       return {
//         loading: false,
//         products: action.payload.products,
//         // handle other properties as needed...
//       };
//     case ALL_PRODUCT_NAME_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//   }
// }; 
export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
			break;
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
			break;
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
			break;
		case CLEAR_PRODUCT_DETAILS: // Handle the new action type to clear the product state
			return {
				...state,
				product: null,
				loading: false,
				error: null,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
			break;
		default:
			return state;
	}
};

//Add new Review
export const newReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

//admin products reducers start
// export const adminproductsReducers = (state={ products: []},action)=>{
//     switch(action.type){
//         case ADMIN_PRODUCT_REQUEST:
//             return {
//                 loading:true,
//                 products:[]
//             }
//         case ADMIN_PRODUCT_SUCCESS:
//             return {
//                 loading: false,
//                 products: action.payload,
//             };
//         case ADMIN_PRODUCT_FAIL:
//             return{
//                 loading:false,
//                 error:action.payload,
//             }
//         case CLEAR_ERRORS:
//             return{
//                 ...state,
//                 error:null,
//             }
//     default:
//         return state;
//     }
// }
export const newProductReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case NEW_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				product: action.payload.product,
			};
		case NEW_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_PRODUCT_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const productReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
		case UPDATE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case DELETE_PRODUCT_FAIL:
		case UPDATE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_PRODUCT_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case UPDATE_PRODUCT_RESET:
			return {
				...state,
				isUpdated: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

//admin products reducers end
