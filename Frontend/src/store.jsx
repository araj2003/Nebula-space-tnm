import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducers } from './reducers/productReducers';
import { loadAnimalTypeReducer } from './reducers/categories/animalTypeReducer';
import { loadTreatmentTypeReducer } from './reducers/categories/treatmentTypeReducer';
import { loadDailyEssentialTypeReducer } from './reducers/categories/dailyEssentialsTypeReducer';
import { loadMedicalCareTypeReducer } from './reducers/categories/medicalCareTypeReducers';
import { UpdatePasswordReducer, forgotPasswordReducer, userReducer, updateUserReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { categoryReducer } from "./reducers/categoryReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';
import varietyReducer from './reducers/varietiesReducer';

/**
 * Root reducer that combines all the reducers.
 */

//combine reducers
const reducer = combineReducers({
   products: productsReducers,
   animalTypeAll: loadAnimalTypeReducer,
   treatmentTypeAll: loadTreatmentTypeReducer,
   dailyEssentialTypeAll: loadDailyEssentialTypeReducer,
   medicalCareTypeAll: loadMedicalCareTypeReducer,
   productDetails:productDetailsReducer,
   user:userReducer,
   updatePassword: UpdatePasswordReducer,
   forgotPassword:forgotPasswordReducer,
   cart:cartReducer,
   newOrder:newOrderReducer,
   myOrders: myOrdersReducer,
   orderDetails: orderDetailsReducer,
   newReview: newReviewReducer,
   newProduct:newProductReducer,
   product: productReducer,
   varietyDetails: varietyReducer,
   categories: categoryReducer,
   updateUser :updateUserReducer 
});

//initial state

const middleware = [thunk];
/**
 * Redux store creation.
 */
const store = createStore(reducer,  composeWithDevTools(applyMiddleware(...middleware)))

export default store;