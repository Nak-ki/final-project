import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { IOrderWithComments } from "../../interfaces/IOrder";
import { orderService } from "../../services/orderService";



interface IState {
    orders: IOrderWithComments[];
    total: number
    limit: number
    page: string
}

const initialState: IState = {
    orders: [],
    total: null,
    limit: null,
    page: null,
}


const getAll = createAsyncThunk<{data: IOrderWithComments[], total: number, limit: number, page: string}, {query: string}>(
    "orderSlice/getAll",
    async ({query}, thunkAPI) => {
        try {
            const {data} = await orderService.getAll(query);
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)



const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder

        .addCase(getAll.fulfilled, (state, action) => {
            state.orders = action.payload.data
            state.page = action.payload.page
            state.limit = action.payload.limit
            state.total = action.payload.total
        })

})

const {reducer: orderReducer, actions} = orderSlice

const orderActions = {
    ...actions,
   getAll
}

export {
    orderReducer,
    orderActions
}