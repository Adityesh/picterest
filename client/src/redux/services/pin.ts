import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config";
const PIN_API = "/pin/";

const BASE_URL = BACKEND_URL + PIN_API;

export interface AddPin {
    image: string;
    description: string;
    owner: string;
    tags: Array<string>;
}

export interface DeletePin {
    _id: string;
    owner: string;
}

export interface LikePin {
    pinId: string;
    userId: string;
}

export interface GetPin {
    page : number,
    limit : number,
}

const token = localStorage.getItem("token")?.toString();
const authHeader = `Bearer ${token}`;

export const PinApi = createApi({
    reducerPath: "pinApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: builder => ({
        add: builder.query({
            query: (body: AddPin) => ({
                url: "add",
                method: "POST",
                body,
                headers: {
                    authorization: authHeader,
                },
            }),
        }),
        delete: builder.query({
            query: (body: DeletePin) => ({
                url: "delete",
                method: "DELETE",
                body,
                headers: {
                    authorization: authHeader,
                },
            }),
        }),
        like: builder.query({
            query: (body: LikePin) => ({
                url: "like",
                method: "POST",
                body,
                headers: {
                    authorization: authHeader,
                },
            }),
        }),
        get : builder.query({
            query : ({ limit = 5, page } : GetPin) => ({
                url : `get?page=${  page}&limit=${limit}`,
                method : "GET",
            }),
        }),
    }),
});

export const {
    useLazyAddQuery: useLazyAddPin,
    useGetQuery : useGetPins,
    useLazyDeleteQuery: useLazyDeletePin,
} = PinApi;
