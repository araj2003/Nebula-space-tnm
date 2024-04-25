import { DAILY_ESSENTIALS_TYPE_LOAD_FAIL, DAILY_ESSENTIALS_TYPE_LOAD_REQUEST, DAILY_ESSENTIALS_TYPE_LOAD_RESET, DAILY_ESSENTIALS_TYPE_LOAD_SUCCESS } from "../../constants/categories/dailyEssentialsConstants";

export const loadDailyEssentialTypeReducer =  (state = {dailyEssentialType:[] },action)=>{
    switch (action.type){
        case DAILY_ESSENTIALS_TYPE_LOAD_REQUEST:
            return { loading : true}
        case DAILY_ESSENTIALS_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                dailyEssentialType: action.payload.subCategoryT
            }
        case DAILY_ESSENTIALS_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DAILY_ESSENTIALS_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}