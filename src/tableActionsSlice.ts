import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import type {DataType, FormValues} from "./types.ts";

export const initialState: DataType[] = [
    {
        key: uuidv4(),
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: uuidv4(),
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: uuidv4(),
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const tableActions = createSlice({
    name: 'users',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<FormValues>) => {
            state.push({key: uuidv4(), ...action.payload})
        },
        update: (state, action: PayloadAction<{ key: string; values: FormValues }>) => {
            const index = state.findIndex(user => user.key === action.payload.key)
            if (index !== -1) {
                state[index] = {key: action.payload.key, ...action.payload.values}
            }
        },
        remove: (state, action: PayloadAction<string>) => {
            return state.filter(user => user.key !== action.payload)
        }
    }
})

export const {create, update, remove} = tableActions.actions

export default tableActions.reducer