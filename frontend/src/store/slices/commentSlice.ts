
import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { commentService } from "../../services/commentService";

interface IState {
    commentTrigger: boolean
}

const initialState: IState = {
    commentTrigger: false,
}



const createComment = createAsyncThunk<void, {body: string, id: string}>(
    "commentSlice/createComment",
    async ({body, id}, thunkAPI) => {
        try {
            await commentService.create({body}, id);

        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)



const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder

        .addMatcher(isFulfilled(createComment), state => {
            state.commentTrigger = !state.commentTrigger
        })

})

const {reducer: commentReducer, actions} = commentSlice

const commentActions = {
    ...actions,
    createComment,
}

export {
    commentReducer,
    commentActions,
}