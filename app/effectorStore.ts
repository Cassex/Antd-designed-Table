import { createEvent, createStore, sample } from "effector";
import { createGate } from 'effector-react';
import type { DataType, FormValues } from "../features/types";
import {
  usersQuery,
  createUserMutation,
  updateUserMutation,
  deleteUserMutation,
} from "../features/api";

const $users = createStore<DataType[]>([]);

const userCreated = createEvent<FormValues>();
const userUpdated = createEvent<DataType>();
const userDeleted = createEvent<number>();
const userDuplicated = createEvent<DataType>();

// Получение
sample({
  clock: usersQuery.finished.success,
  fn: ({ result }) => result,
  target: $users,
});

// Добавление
sample({
  clock: userCreated,
  target: createUserMutation.start,
});

// Обновление
sample({
  clock: userUpdated,
  target: updateUserMutation.start,
});

// Удаление
sample({
  clock: userDeleted,
  target: deleteUserMutation.start,
});

// Дублирование
sample({
  clock: userDuplicated,
  fn: (record) => ({
    name: record.name,
    age: record.age,
    address: record.address,
    tags: record.tags,
  }),
  target: createUserMutation.start,
});

$users.watch((users) => {
  console.log("USERS:", users);
});

// -- тесты --
sample({
  clock: usersQuery.finished.failure,
  fn: (failure) => console.error("ПРОВАЛ usersQuery:", failure),
});

sample({
  clock: usersQuery.finished.success,
  fn: (success) => console.log("УСПЕХ usersQuery:", success),
});

sample({
  clock: createUserMutation.finished.failure,
  fn: (failure) => console.error("ПРОВАЛ createUserMutation:", failure),
});

sample({
  clock: createUserMutation.finished.success,
  fn: (success) => console.log("УСПЕХ createUserMutation:", success),
});

export {
  $users,
  userCreated,
  userUpdated,
  userDeleted,
  userDuplicated,
  usersQuery,
};

const UsersGate = createGate();

sample({
  clock: UsersGate.open,
  target: usersQuery.start,
});

export {UsersGate}