import { createSlice } from "@reduxjs/toolkit";

export const resetCart = () => {
  return {
    type: 'cart/resetCart',
  };
};

const loadStateFromSessionStorage = (key, defaultValue) => {
  const storedValue = sessionStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const initialState = {
  cartItems: loadStateFromSessionStorage('cartItems', []),
  totalQuantity: loadStateFromSessionStorage('totalQuantity', 0),
  totalAmount: loadStateFromSessionStorage('cartTotalAmount', 0),
  allRatings: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSearchItem(state, action) {
      state.searchItem = action.payload;
    },

    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          equipment_name: newItem.equipment_name,
          product_signed_url: newItem.product_signed_url,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          businessId: newItem.cartBusinessId,
          businessName: newItem.cartBusinessName,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = parseFloat(
        state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        ).toFixed(2)
      );

      sessionStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      // sessionStorage.setItem('cartBusinessId', JSON.stringify(newItem.cartItems));
      console.log(state,"replaceItem") 
    },
    replaceItem(state, action) {
    //   sessionStorage.removeItem("cartItems")
    //   sessionStorage.removeItem("totalQuantity")

    //   const newItem = action.payload;
    //   const existingItem = state.cartItems.find(
    //     (item) => item.id === newItem.id
    //   );
    //   state.totalQuantity++;
    //   console.log(state,"replaceItem",newItem,existingItem)
    //   if (!existingItem) {
    //     state.cartItems.push({
    //       id: newItem.id,
    //       equipment_name: newItem.equipment_name,
    //       product_signed_url: newItem.product_signed_url,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //       businessId: newItem.cartBusinessId,
    //       businessName: newItem.cartBusinessName,
    //     });
    //   }
    //   sessionStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
    //   sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    // console.log(state?.cartItems,"replce")
    resetCart(state)
    },


    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--;

        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
        }

        state.totalAmount = parseFloat(
          state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
          ).toFixed(2)
        );

        sessionStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    deleteItem(state, action) {
      const id = action.payload;
      const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        state.totalQuantity -= existingItem.quantity;

        state.cartItems.splice(existingItemIndex, 1);

        state.totalAmount = parseFloat(
          state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
          ).toFixed(2)
        );

        sessionStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    // Total Amount
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
      // console.log("totalAmount", state.totalAmount);
    },

    
    SetAllRatings(state, action) {
      state.allRatings = action.payload;
    },

    //reset cart
    resetCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('totalQuantity');
      sessionStorage.removeItem('cartTotalAmount');
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
