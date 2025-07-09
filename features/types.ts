interface DataType {
    id: number;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

type FormValues = Omit<DataType, 'id'>;

export type { DataType, FormValues };
