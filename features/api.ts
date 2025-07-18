import { createJsonQuery, createJsonMutation, concurrency, declareParams, update } from '@farfetched/core';
import type { DataType, FormValues } from './types';
import { DataTypeContract, DataTypeAnswerContract, SingleUserContract } from './types';

console.log(SingleUserContract)

const serverUrl = 'http://localhost:31299'

const usersQuery = createJsonQuery({
    request: {
        method: 'GET',
        url: `http://localhost:31299/users`,
    },
    response: {
        contract: DataTypeContract,
    },
});

const createUserMutation = createJsonMutation({
    params: declareParams<FormValues>(),
    request: {
        method: 'POST',
        url: `http://localhost:31299/users`,
        body: (payload) => payload,
    },
    response: {contract: SingleUserContract}
});

const updateUserMutation = createJsonMutation({
    params: declareParams<DataType>(),
    request: {
        method: 'PUT',
        url: (payload) => `${serverUrl}/users/${payload.id}`,
        body: (payload) => payload,
    },
    response: {contract: DataTypeAnswerContract}
});

const deleteUserMutation = createJsonMutation({
    params: declareParams<number>(),
    request: {
        method: 'DELETE',
        url: (id) => `${serverUrl}/users/${id}`,
    },
    response: {contract: DataTypeAnswerContract}
});



concurrency(usersQuery, { strategy: 'TAKE_LATEST' });

update(usersQuery, {
    on: createUserMutation,
    by: {
        success: ({ mutation, query }) => ({
            result: [...query.result, mutation.result],
        }),
    },
});

// todo Доделаю

// update(usersQuery, {
//     on: updateUserMutation,
//     by: {
//         success: ({ mutation, query }) => ({
//             result: [...query.result, mutation.result],
//         }),
//     },
// });
//
// update(usersQuery, {
//     on: deleteUserMutation,
//     by: {
//         success: ({ mutation, query }) => ({
//             result: [...query.result, mutation.result],
//         }),
//     },
// });

export {usersQuery, createUserMutation, updateUserMutation, deleteUserMutation}