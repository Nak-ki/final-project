import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { IOrderWithComments } from "../../interfaces/IOrder";
import { orderService } from "../../services/orderService";
import { saveAs } from 'file-saver';
import { IOrderStatistics } from "../../interfaces/IOrderStatistics";



interface IState {
    orders: IOrderWithComments[];
    total: number
    limit: number
    page: string
    updateTrigger: boolean
    statistics: IOrderStatistics
}

const initialState: IState = {
    orders: [],
    total: null,
    limit: null,
    page: null,
    updateTrigger: false,
    statistics: null,
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

const update = createAsyncThunk<void, {id: string, body: {group:string, status:string, name:string, sum:number, surname:string,  alreadyPaid: number, email: string, course: string, phone: string, course_format: string, age: number, course_type: string}}>(
    "orderSlice/update",
    async ({id, body}, thunkAPI) => {
        try {
          await orderService.update(id, body);

        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const downloadExcel = createAsyncThunk<void, {query: string}>(
    "orderSlice/downloadExcel",
    async ({query}, thunkAPI) => {
        try {
            const {data} = await orderService.downloadExcel(query);
            saveAs(data, `Orders.xlsx`);

        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getStatistics = createAsyncThunk<IOrderStatistics, void>(
    "orderSlice/getStatistics",
    async (_, thunkAPI) => {
        try {
            const {data} = await orderService.getStatistics();
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
        .addCase(getStatistics.fulfilled, (state, action) => {
            state.statistics = action.payload
        })
        .addMatcher(isFulfilled(update), state => {
        state.updateTrigger = !state.updateTrigger
    })

})

const {reducer: orderReducer, actions} = orderSlice

const orderActions = {
    ...actions,
    getAll,
    update,
    downloadExcel,
    getStatistics
}

export {
    orderReducer,
    orderActions
}