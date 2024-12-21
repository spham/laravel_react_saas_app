import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosRequest, getConfig } from '../../helpers/config'

const initialState = {
    isLoggedIn: false,
    token: '',
    user: null,
    chosenPlan: null
}

//decrement user hearts action
export const decrementUserHearts = createAsyncThunk(
    'decrement/hearts',
    async (token) => {
        const response = await axiosRequest.get('user/decrement/hearts',getConfig(token))
        return response.data.user
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.user = action.payload
        },
        setLoggedInOut(state, action) {
            state.isLoggedIn = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setChosenPlan(state, action) {
            state.chosenPlan = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(decrementUserHearts.fulfilled, (state,action) => {
            state.user = action.payload
        })
    }
})

const userReducer = userSlice.reducer

export const { setCurrentUser, setToken, setLoggedInOut, setChosenPlan } = userSlice.actions

export default userReducer