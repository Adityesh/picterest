import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../config';
const PIN_API = '/pin/';

const BASE_URL = BACKEND_URL + PIN_API;

export interface AddPin {
    image : string,
    description : string,
    owner : string
}

export interface DeletePin {
    _id : string,
    owner : string
}

export interface LikePin {
    pinId : string,
    userId : string
}


export const PinApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints : (builder) => ({
        add : builder.query({
            query : (body : AddPin) => ({ url : 'add', method : 'POST', body }),
        }),
        delete : builder.query({
            query : (body : DeletePin) => ({ url : 'delete', method : 'DELETE', body }),
        }),
        like : builder.query({
            query : (body : LikePin) => ({ url : 'like', method : 'POST', body }),
        }),
    }),

});

export const { useLazyAddQuery, useLazyDeleteQuery } = PinApi;
