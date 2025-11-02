
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IGroup } from "../../interfaces/IGroup";
import { groupService } from "../../services/groupService";

interface IState {
    groups: IGroup[];
}

const initialState: IState = {
    groups: [],
}


const getAll = createAsyncThunk<IGroup[], void>(
    "groupSlice/getAll",
    async (_, thunkAPI) => {
        try {
            const {data} = await groupService.getAll();
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const create = createAsyncThunk<void, {name: string}>(
    "groupSlice/create",
    async ({name}, thunkAPI) => {
        try {
          await groupService.create({name});

        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)



const groupSlice = createSlice({
    name: "groupSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder

        .addCase(getAll.fulfilled, (state, action) => {
            state.groups = action.payload

        })

})

const {reducer: groupReducer, actions} = groupSlice

const groupActions = {
    ...actions,
    getAll,
    create,
}

export {
    groupReducer,
    groupActions
}