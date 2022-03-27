import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthApi } from '../services/auth';

interface LoginState {
    input: "";
    password: "";
}

interface RegisterState {
    userName: "";
    email: "";
    password: "";
}

export interface AuthState {
    login: LoginState;
    register: RegisterState;
    token : string,
    isAuthenticated : boolean,
    user : { 
        _id : string,
        email : string,
        userName : string,
        likes : Array<any>
        pins : Array<any>
    },
}

const initialState: AuthState = {
    login: {
        input : "",
        password: "",
    },
    register: {
        email: "",
        password: "",
        userName: "",
    },
    token : '',
    isAuthenticated : false,
    user : {
        _id : '',
        userName : '',
        email : '',
        pins : [],
        likes : [],
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateLogin: (state, { payload }) => {
            state.login = {
                ...state.login,
                ...payload,
            };
        },
        updateRegister: (state, { payload }) => {
            state.register = {
                ...state.register,
                ...payload,
            };
        },
        logoutUser : (state) => {
            state.token = '';
            state.isAuthenticated = false;
            localStorage.clear();
        },
    },
    extraReducers : (builder) => {
        builder
        .addMatcher(
            AuthApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                // state.login = {
                //     ...initialState.login,
                // },
                state.token = payload.data.token;
                state.user = payload.data.user;
                state.isAuthenticated = true;
                localStorage.setItem('token', payload.data.token);
            },
        )
        .addMatcher(AuthApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.register = {
                    ...initialState.register,
                };
            },
        );
    },
});

// Action creators are generated for each case reducer function
export const { updateLogin, updateRegister, logoutUser } = authSlice.actions;

export default authSlice.reducer;
