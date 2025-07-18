import { z as zod } from 'zod';
import { zodContract } from '@farfetched/zod';

const DataType = zod.object({
    id: zod.number(),
    name: zod.string(),
    age: zod.number(),
    address: zod.string().optional(),
    tags: zod.array(zod.string()).optional(),
});

const DataTypeAnswer = DataType.omit({ id: true });

const DataTypeContract = zodContract(zod.array(DataType));
const DataTypeAnswerContract = zodContract(zod.array(DataTypeAnswer));

type DataType = zod.infer<typeof DataType>;
type FormValues = zod.infer<typeof DataTypeAnswer>;
export const SingleUserContract = zodContract(DataTypeAnswer);

export { DataTypeContract, DataTypeAnswerContract, DataType, FormValues };
