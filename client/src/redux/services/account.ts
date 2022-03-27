import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config";
const ACCOUNT_API = "/account/";

const BASE_URL = BACKEND_URL + ACCOUNT_API;

interface Request {
    _id: string;
}

const token = localStorage.getItem("token");
const authHeader = `Bearer ${token}`;

export const AccountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: builder => ({
        delete: builder.query({
            query: (body: Request) => ({
                url: "add",
                method: "POST",
                body,
                headers: {
                    Authorization: authHeader,
                },
            }),
        }),
        get: builder.query({
            query: ({ _id }: Request) => ({
                url: `get?_id=${  _id}`,
                method: "GET",
                headers: {
                    Authorization: authHeader,
                },
                
            }),
        }),
    }),
});

export const { useLazyGetQuery, useLazyDeleteQuery, useGetQuery : useGetAccountDetails } = AccountApi;
