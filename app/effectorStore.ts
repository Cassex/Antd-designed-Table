import { createEvent, createStore } from "effector";
import { v4 as uuidv4 } from 'uuid';
import type {DataType, FormValues} from "../features/types";

export const $users = createStore<DataType[]>([
    {
        id: uuidv4(),
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        id: uuidv4(),
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        id: uuidv4(),
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
]);

export const userCreated = createEvent<FormValues>();
export const userUpdated = createEvent<DataType>();
export const userDeleted = createEvent<string>();
export const userDuplicated = createEvent<DataType>();


$users.on(userCreated, (users, newUser) => [...users, {id: uuidv4(), ...newUser}]);
$users.watch((users) => {
    console.log("USERS:", users);
});

$users.on(userUpdated, (users, userUpdated) =>
   users.map(user => user.id === userUpdated.id ? userUpdated : user)
);
$users.on(userDeleted, (users, id) => users.filter(user => user.id !== id));
$users.on(userDuplicated, (users, record) => [...users, { ...record, id: uuidv4()}])
