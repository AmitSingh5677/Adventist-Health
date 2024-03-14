import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shippingCart/cartSlice";


const store = configureStore({
    reducer: {
        cart: cartSlice.reducer

    },
});

export default store;
