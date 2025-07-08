import {FC, useState} from 'react'
import {Space, Table, Tag, Button, Form} from "antd";
import type {ColumnsType} from 'antd/es/table'
import type {DataType, FormValues} from '../types.ts'
import UserModal from "./UserModal";
import {useGetUsersQuery, usePostUsersMutation} from '../api'
import {v4 as uuidv4} from "uuid";

const App: FC = () => {
        const {data: users} = useGetUsersQuery()
        const [postUsers] = usePostUsersMutation()
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
            let updatedUsers = [...(users ?? [])]
            if (editingUser) {
                updatedUsers = updatedUsers.map(user =>
                    user.key === editingUser.key
                        ? {...user, ...values}
                        : user
                )
            } else {
                updatedUsers.push({key: uuidv4(), ...values})
            }
            await postUsers(updatedUsers)
            formCancel()
        }

        const deleteUser = async (key: string) => {
            const filteredUsers = (users ?? []).filter(user => user.key !== key)
            await postUsers(filteredUsers)
        }

        const formCancel = () => {
            setEditingUser(null)
            form.resetFields();
            setIsOpenModal(false)
        }

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
                        <Button onClick={() => deleteUser(record.key)}>Delete</Button>
                    </Space>
                )
            }
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
                        scroll={{y: 333}}
                        pagination={false}/>
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
