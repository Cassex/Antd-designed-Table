import {
  createJsonQuery,
  createJsonMutation,
  declareParams,
  keepFresh,
} from "@farfetched/core";
import type { DataType, FormValues } from "./types";
import {
  DataTypeContract,
  SingleUserContract,
  NullableContract,
} from "./types";
const serverUrl = "http://localhost:31299";

const usersQuery = createJsonQuery({
  request: {
    method: "GET",
    url: `http://localhost:31299/users`,
  },
  response: {
    contract: DataTypeContract,
  },
});

const createUserMutation = createJsonMutation({
  params: declareParams<FormValues>(),
  request: {
    method: "POST",
    url: `http://localhost:31299/users`,
    body: (payload) => payload,
  },
  response: { contract: SingleUserContract },
});

const updateUserMutation = createJsonMutation({
  params: declareParams<DataType>(),
  request: {
    method: "PUT",
    url: (payload) => `${serverUrl}/users/${payload.id}`,
    body: (payload) => payload,
  },
  response: { contract: SingleUserContract },
});

const deleteUserMutation = createJsonMutation({
  params: declareParams<number>(),
  request: {
    method: "DELETE",
    url: (id) => `${serverUrl}/users/${id}`,
  },
  response: { contract: NullableContract },
});

keepFresh(usersQuery, {
  automatically: true,
  triggers: [
    createUserMutation.finished.success,
    deleteUserMutation.finished.success,
    updateUserMutation.finished.success,
  ],
});

export {
  usersQuery,
  createUserMutation,
  updateUserMutation,
  deleteUserMutation,
};
