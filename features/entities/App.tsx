import { FC, useState } from 'react';
import { Button, Form } from 'antd';
import type { FormValues, DataType } from '../types';
import { useUnit } from 'effector-react';
import {
    userCreated,
    userUpdated,
    UsersGate
} from '../../app/effectorStore';
import UserModal from './UserModal';
import UsersTable from '../shared/UsersTable';

const App: FC = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState<DataType | null>(null);
    const [form] = Form.useForm<FormValues>();

    const [userCreate, userUpdate] = useUnit([userCreated, userUpdated]);

    const showAddModal = () => {
        setEditingUser(null);
        form.resetFields();
        setIsOpenModal(true);
    };

    const showEditModal = (record: DataType) => {
        setEditingUser(record);
        form.setFieldsValue(record);
        setIsOpenModal(true);
    };

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

    return (
        <>
            <UsersGate />

            <div style={{ display: 'flex', gap: 20 }}>
                <Button
                    type="primary"
                    style={{ marginBottom: 15 }}
                    onClick={showAddModal}
                >
                    Add new user
                </Button>
            </div>

            <UsersTable onEdit={showEditModal} />

            <UserModal
                visible={isOpenModal}
                onCancel={formCancel}
                onFinish={onFinish}
                editingUser={editingUser}
                form={form}
            />
        </>
    );
};

export default App;
