import { ANIMAL_TYPE_LOAD_FAIL, ANIMAL_TYPE_LOAD_REQUEST, ANIMAL_TYPE_LOAD_RESET, ANIMAL_TYPE_LOAD_SUCCESS } from "../../constants/categories/animalTypeConstants";

export const loadAnimalTypeReducer =  (state = {animalType:[] },action)=>{
    switch (action.type){
        case ANIMAL_TYPE_LOAD_REQUEST:
            return { loading : true}
        case ANIMAL_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                animalType: action.payload.subCategoryT
            }
        case ANIMAL_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ANIMAL_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}