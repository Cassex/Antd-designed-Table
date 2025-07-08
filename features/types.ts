interface DataType {
    key: string;
    name: string;
    age: number;
    address?: string;
    tags?: string[];
}

type FormValues = Omit<DataType, 'key'>;

export type { DataType, FormValues };
