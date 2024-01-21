import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { $api } from '../shared/api/api'
import axios from 'axios'

type AuthState = {
    accessToken: string | null,
    error?: string | undefined
}

type LoginData = {
    email: string,
    password: string
}

type TokensData = {
    accessToken: string,
    refreshToken: string
}


const initialState: AuthState = {
    accessToken: localStorage.getItem('token')
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<TokensData>) => {
            state.accessToken = action.payload.accessToken
            localStorage.setItem('refreshToken', action.payload.refreshToken)
        },
        logOut: (state) => {
            state.accessToken = null
            localStorage.removeItem('refreshToken')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.pending, (state) => {
                state.error = undefined
            })
            .addCase(authThunk.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(authThunk.fulfilled, (state, action) => {
                state.error = undefined
                state.accessToken = action.payload.accessToken
                localStorage.setItem('refreshToken', action.payload.refreshToken)
            })
    }
})

export const authThunk = createAsyncThunk<
    TokensData,
    LoginData,
    { rejectValue: string }
>('authThunk', async (requestData, { rejectWithValue }) => {
    try {
        const data = await $api.post<TokensData>('/api/signin', requestData)
        return data.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) return rejectWithValue("Неизвестная ошибка")
            if (error.response.status === 404 || error.response.status === 400) {
                return rejectWithValue("Неверные данные")
            } else if (error.response.status >= 500) {
                return rejectWithValue("Ошбика на сервере")
            }
        }
        console.log("iuohjuiohjuiohujio");
        
        return rejectWithValue("Неизвестная ошибка")
    }
})


export const { logOut, setTokens } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.accessToken
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer