import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DataType, FormValues } from './types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUsers: build.query<DataType[], void>({
            query: () => 'users',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Users' as const, id })), { type: 'Users', id: 'LIST' }]
                    : [{ type: 'Users', id: 'LIST' }],
        }),

        createUser: build.mutation<DataType, FormValues>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),

        updateUser: build.mutation<DataType, { id: number; values: Partial<DataType> }>({
            query: ({ id, values }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: values,
            }),

            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),

        deleteUser: build.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = api;