import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_RESET,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	ACTIVATE_ACCOUNT_REQUEST,
	ACTIVATE_ACCOUNT_SUCCESS,
	ACTIVATE_ACCOUNT_FAIL,
	CLEAR_ERRORS,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
} from "../constants/userConstants";

export const updateUserReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
			return {
				loading: true,
			};
		case UPDATE_USER_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case UPDATE_USER_FAIL:
			return {
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
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: action.payload,
        emailSent: true,
      };
    case LOAD_USER_SUCCESS:
    case ACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        emailSent: false,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    //logout
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//Update password Reducer
export const UpdatePasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case UPDATE_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case UPDATE_PASSWORD_RESET:
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

// Forgot-passsword
export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return {
				forgotMailSent: false,
			};
		case RESET_PASSWORD_REQUEST:
		case ACTIVATE_ACCOUNT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.payload,
				forgotMailSent: true,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload,
			};
		case ACTIVATE_ACCOUNT_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload,
			};

		case FORGOT_PASSWORD_FAIL:
		case RESET_PASSWORD_FAIL:
		case ACTIVATE_ACCOUNT_FAIL:
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
