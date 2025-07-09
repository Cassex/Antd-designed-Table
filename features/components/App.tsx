import {FC, useState} from 'react'
import {Space, Table, Tag, Button, Form} from "antd";
import type {ColumnsType} from 'antd/es/table'
import type {DataType, FormValues} from '../types.ts'
import UserModal from "./UserModal";
import {useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation} from '../api'

const App: FC = () => {
        const {data: users} = useGetUsersQuery()
        const [createUser] = useCreateUserMutation()
        const [updateUser] = useUpdateUserMutation()
        const [deleteUser] = useDeleteUserMutation()
        const [isOpenModal, setIsOpenModal] = useState(false);
        const [editingUser, setEditingUser] = useState<DataType | null>(null);
        const [form] = Form.useForm<FormValues>();

        const showAddModal = () => {
            setEditingUser(null)
            form.resetFields()
            setIsOpenModal(true)
        }

        const showEditModal = (record: DataType) => {
            setEditingUser(record)
            form.setFieldsValue(record)
            setIsOpenModal(true)
        }

        const onFinish = async (values: FormValues) => {
            try {
                if (editingUser && typeof editingUser.id !== 'undefined') {
                    await updateUser({
                        id: editingUser.id,
                        values,
                    }).unwrap();
                } else {
                    await createUser(values).unwrap();
                }
                formCancel();
            } catch (err) {
                console.error('Ошибка при сохранении:', err);
            }
        };

        const handleDeleteUser = async (id: number) => {
            await deleteUser(id).unwrap();
        };

        const formCancel = () => {
            setEditingUser(null);
            form.resetFields();
            setIsOpenModal(false);
        };

        const columns: ColumnsType<DataType> = [
            {title: 'Name', dataIndex: 'name', key: 'name'},
            {title: 'Age', dataIndex: 'age', key: 'age', width: 100},
            {title: 'Address', dataIndex: 'address', key: 'address'},
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                width: 380,
                render: (_, {tags}) => (
                    <>
                        {(tags || []).map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })
                        }
                    </>
                )
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button onClick={() => showEditModal(record)}>Edit</Button>
                        <Button onClick={() => handleDeleteUser(record.id)}>Delete</Button>
                    </Space>
                ),
            },
        ];


        return (
            <>
                <div style={{display: 'flex', gap: 20}}>
                    <Button
                        type='primary'
                        style={{marginBottom: 15}}
                        onClick={showAddModal}
                    >
                        Add new user
                    </Button>
                </div>
                <div className='table'>
                    <Table<DataType>
                        columns={columns}
                        dataSource={users}
                        rowKey="id"
                        scroll={{y: 333}}
                        pagination={false}
                    />
                </div>
                <UserModal
                    visible={isOpenModal}
                    onCancel={formCancel}
                    onFinish={onFinish}
                    editingUser={editingUser}
                    form={form}
                />
            </>
        )
    }
;

export default App;
