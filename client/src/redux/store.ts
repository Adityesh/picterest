import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { AuthApi } from "./services/auth";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
    },
    devTools : true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(AuthApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
