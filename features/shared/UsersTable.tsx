import { FC } from 'react';
import { Table, Space, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LoadingOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import type { DataType } from '../types';
import {
    $users,
    usersQuery,
    userDeleted,
    userDuplicated,
} from '../../app/effectorStore';

const UsersTable: FC<{ onEdit: (record: DataType) => void; }> = ({ onEdit }) => {

    const [users, isFetching, userDelete, userDuplicate] = useUnit([
        $users,
        usersQuery.$pending,
        userDeleted,
        userDuplicated,
    ]);

    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 380,
            render: (_, { tags }) => (
                <>
                    {(tags || []).map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') color = 'volcano';
                        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => onEdit(record)}>Edit</Button>
                    <Button onClick={() => userDelete(record.id)}>Delete</Button>
                    <Button onClick={() => userDuplicate(record)}>Copy</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="table">
            <Table<DataType>
                columns={columns}
                dataSource={users}
                rowKey="id"
                scroll={{ y: 333 }}
                pagination={false}
                loading={{
                    spinning: isFetching,
                    tip: !users.length ? "Загрузка пользователей..." : "Обновление...",
                    size: 'large',
                    indicator: <LoadingOutlined spin />,
                }}
            />
        </div>
    );
};

export default UsersTable;
