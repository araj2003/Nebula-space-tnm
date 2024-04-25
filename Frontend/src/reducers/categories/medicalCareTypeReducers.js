import { MEDICAL_CARE_TYPE_LOAD_FAIL, MEDICAL_CARE_TYPE_LOAD_REQUEST, MEDICAL_CARE_TYPE_LOAD_RESET, MEDICAL_CARE_TYPE_LOAD_SUCCESS } from "../../constants/categories/medicalCareConstants";

export const loadMedicalCareTypeReducer =  (state = {MedicalCareType:[] },action)=>{
    switch (action.type){
        case MEDICAL_CARE_TYPE_LOAD_REQUEST:
            return { loading : true}
        case MEDICAL_CARE_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                MedicalCareType: action.payload.subCategoryT
            }
        case MEDICAL_CARE_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case MEDICAL_CARE_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}