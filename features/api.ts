import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {DataType} from './types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:31299/'}),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUsers: build.query<DataType[], void>({
            query: () => 'users',
            providesTags: ['Users'],
        }),

        postUsers: build.mutation<DataType[], DataType[]>({
            query(updatedUsers) {
                return {
                    url: 'users',
                    method: 'POST',
                    body: updatedUsers,
                };
            },
            invalidatesTags: ['Users'],
        }),
    }),
});


export const {
    useGetUsersQuery,
    usePostUsersMutation,
} = api;
