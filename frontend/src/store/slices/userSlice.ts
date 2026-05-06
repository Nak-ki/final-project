import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { IOrderWithComments } from "../../interfaces/IOrder";
import { orderService } from "../../services/orderService";
import { saveAs } from 'file-saver';
import { IOrderStatistics } from "../../interfaces/IOrderStatistics";
import { IUserRes } from "../../interfaces/IUser";
import { userService } from "../../services/userService";



interface IState {
    users: IUserRes[]
    total: number
    limit: number
    page: string
    updateTrigger: boolean
    createTrigger: boolean

}

const initialState: IState = {
    users: [],
    total: null,
    limit: null,
    page: null,
    updateTrigger: false,
    createTrigger: false,
}


const getAll = createAsyncThunk<{data: IUserRes[], total: number, limit: number, page: string}, {query: string}>(
    "userSlice/getAll",
    async ({query}, thunkAPI) => {
        try {
            const {data} = await userService.getAll(query);
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const create = createAsyncThunk<void,{email: string, name: string, surname: string}>(
    "userSlice/create",
    async ({email, name, surname}, thunkAPI) => {
        try {
            await userService.create({email, name, surname});

        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.users = action.payload.data
            state.page = action.payload.page
            state.limit = action.payload.limit
            state.total = action.payload.total
        })
        .addMatcher(isFulfilled(create), (state, action) => {
            state.createTrigger = !state.createTrigger
        })


})

const {reducer: userReducer, actions} = userSlice

const userActions = {
    ...actions,
    getAll,
    create,

}

export {
    userReducer,
    userActions
}