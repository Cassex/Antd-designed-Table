import {FC, useState} from 'react'
import {Space, Table, Tag, Button, Form, Spin} from "antd";
import type {ColumnsType} from 'antd/es/table'
import type {DataType, FormValues} from '../types.ts'
import UserModal from "./UserModal";
import {useUnit} from 'effector-react'
import {$users, userDeleted, userCreated, userUpdated, userDuplicated} from '../../app/effectorStore'

const App: FC = () => {
        const [isOpenModal, setIsOpenModal] = useState(false);
        const [editingUser, setEditingUser] = useState<DataType | null>(null);
        const [form] = Form.useForm<FormValues>();

        const users = useUnit($users);
        const userDelete = useUnit(userDeleted);
        const userCreate = useUnit(userCreated);
        const userUpdate = useUnit(userUpdated);
        const userDuplicate = useUnit(userDuplicated);

        const duplicateRecord = (record) => {
            userDuplicate(record)
        }

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
                    userUpdate({...editingUser, ...values});
                } else {
                    userCreate(values)
                }
                formCancel();
            } catch (err) {
                console.error('Ошибка при сохранении:', err);
            }
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
                        <Button onClick={() => userDelete(record.id)}>Delete</Button>
                        <Button color='cyan' variant='dashed' onClick={() => duplicateRecord(record)}>Copy</Button>
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
