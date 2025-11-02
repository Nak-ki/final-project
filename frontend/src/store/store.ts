import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { orderReducer } from "./slices/orderSlice";
import { groupReducer } from "./slices/groupSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
        group: groupReducer,

    }
})
export {
    store
}