import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    },
});

// Action creators are generated for each case reducer function
export const { updateLogin, updateRegister } = authSlice.actions;

export default authSlice.reducer;
