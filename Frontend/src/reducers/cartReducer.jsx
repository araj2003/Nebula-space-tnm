import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  RESET_CART,
  SAVE_SHIPPING_INFO,
  SAVE_BILLING_INFO,
  GET_CART_ITEMS,
  CHANGE_QUANTITY_CART,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) =>
          i._id === item._id &&
          i.size === item.size &&
          i.color === item.color &&
          i.other === item.other
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i._id !== action.payload),
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case SAVE_BILLING_INFO:
      return {
        ...state,
        billingInfo: action.payload,
      };
    case RESET_CART:
      return {
        cartItems: [],
      };

    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload, // Update cart items with the retrieved data
      };

    case CHANGE_QUANTITY_CART:
      const updatedItem = action.payload;
      const updatedCartItems = state.cartItems.map((item) =>
        item.product._id === updatedItem.product._id ? updatedItem : item
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    default:
      return state;
  }
};
