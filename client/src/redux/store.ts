import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { AuthApi } from "./services/auth";
import { AccountApi } from "./services/account";
import { DashboardApi } from "./services/dashboard";
import { PinApi } from "./services/pin";
import counterReducer from "./slices/counterSlice";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [DashboardApi.reducerPath]: DashboardApi.reducer,
        [PinApi.reducerPath]: PinApi.reducer,
        [AccountApi.reducerPath]: AccountApi.reducer,
        counter: counterReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
    },
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            AuthApi.middleware,
            DashboardApi.middleware,
            PinApi.middleware,
            AccountApi.middleware,
        ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
