import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../config';
const AUTH_API = '/auth/';

const BASE_URL = BACKEND_URL + AUTH_API;

export interface LoginModel {
    userName? : string,
    email? : string,
    password : string
}

export interface RegisterModel {
    userName: string;
    email: string;
    password: string;
}

export const AuthApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints : (builder) => ({
        login : builder.query({
            query : (body : LoginModel) => ({ url : 'login', method : 'POST', body }),
        }),
        register : builder.query({
            query : (body : RegisterModel) => ({ url : 'register', method : 'POST', body }),
        }),
    }),

});

export const { useLazyLoginQuery, useLazyRegisterQuery } = AuthApi;
