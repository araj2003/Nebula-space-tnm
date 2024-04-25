import {
  TREATMENT_TYPE_LOAD_FAIL,
  TREATMENT_TYPE_LOAD_REQUEST,
  TREATMENT_TYPE_LOAD_RESET,
  TREATMENT_TYPE_LOAD_SUCCESS,
} from "../../constants/categories/treatmentTypeConstant";

export const loadTreatmentTypeReducer = (
  state = { treatmentType: [] },
  action
) => {
  switch (action.type) {
    case TREATMENT_TYPE_LOAD_REQUEST:
      return { loading: true };
    case TREATMENT_TYPE_LOAD_SUCCESS:
      return {
        loading: false,
        treatmentType: action.payload.subCategoryT,
      };
    case TREATMENT_TYPE_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TREATMENT_TYPE_LOAD_RESET:
      return {};
    default:
      return state;
  }
};
