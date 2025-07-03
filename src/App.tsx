import React from 'react'
import {Space, Table, Tag, Button, Form} from "antd";
import type {ColumnsType} from 'antd/es/table'
import type {DataType, FormValues} from './types.ts'
import {create, update, remove} from "./tableActionsSlice.ts";
import type {RootState, AppDispatch} from "./store.ts";
import {useDispatch, useSelector} from "react-redux";
import UserModal from "./UserModal.tsx";


const App: React.FC = () => {
        const users = useSelector((state: RootState) => state.users)
        const dispatch = useDispatch<AppDispatch>()

        // const [tableData, setTableData] = React.useState<DataType[]>(data);
        const [isOpenModal, setIsOpenModal] = React.useState(false);
        const [editingUser, setEditingUser] = React.useState<DataType | null>(null);

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

        const onFinish = (values: Omit<DataType, 'key'>) => {
            if (editingUser) {
                dispatch(update({key: editingUser.key, values}))
            } else {
                dispatch(create(values))
            }
            formCancel()
        }

        const deleteUser = (key: string) => {
            dispatch(remove(key))
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
                <Button
                    type='primary'
                    style={{marginBottom: 15}}
                    onClick={showAddModal}
                >
                    Add new user
                </Button>
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
