import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../config';
const AUTH_API = '/dashboard/';

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

export const DashboardApi = createApi({
    reducerPath : 'dashboardApi',
    baseQuery : fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints : (builder) => ({
        
    }),

});

