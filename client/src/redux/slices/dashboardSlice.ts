import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountApi } from "../services/account";

export interface DashboardState {
    addPin: {
        image: string;
        description: string;
        tagsInput: string;
        tagsValue: Array<string>;
        tagsResult: Array<any>;
    };
    userData: {
        userName: string;
        email: string;
        password: string;
        pins: [];
        isDeleted: boolean;
        likes: [];
    };
}

const initialState: DashboardState = {
    addPin: {
        image: "",
        description: "",
        tagsInput: "",
        tagsValue: [],
        tagsResult: [],
    },
    userData : {
        userName : "",
        email : '',
        password : '',
        pins : [],
        isDeleted : false,
        likes : [],
    },
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        updateAddPin: (state, { payload }) => {
            state.addPin = {
                ...state.addPin,
                ...payload,
            };
        },
    },
    extraReducers : (builder) => {
        builder
        .addMatcher(
            AccountApi.endpoints.get.matchFulfilled,
            (state, { payload }) => {
                state.userData = payload.data;
            },
        );
        
    },
});

// Action creators are generated for each case reducer function
export const { updateAddPin } = dashboardSlice.actions;

export default dashboardSlice.reducer;
