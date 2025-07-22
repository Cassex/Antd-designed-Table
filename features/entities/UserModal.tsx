import {FC} from 'react';
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';
import type { FormInstance } from 'antd';
import type { DataType, FormValues } from '../types.ts';

interface Props {
    visible: boolean;
    onCancel: () => void;
    onFinish: (values: Omit<DataType, 'key'>) => void;
    editingUser: DataType | null;
    form: FormInstance<FormValues>;
}

const tags = [
    { label: 'Developer', value: 'developer' },
    { label: 'Teacher', value: 'teacher' },
    { label: 'Nice', value: 'nice' },
    { label: 'Cool', value: 'cool' },
    { label: 'Loser', value: 'loser' },
];

const UserModal: FC<Props> = ({ visible, onCancel, onFinish, editingUser, form }) => {

    return (
        <Modal
            title={editingUser ? 'Edit user' : 'Add new user'}
            open={visible}
            onCancel={onCancel}
            footer={
                <div className="modal-buttons">
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type="primary" onClick={() => form.submit()}>Submit</Button>
                </div>
            }
        >
            <Form
                form={form}
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
            >
                <Form.Item<FormValues> label="Name" name="name" rules={[{ required: true, message: 'Type name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item<FormValues> label="Age" name="age" rules={[{ required: true, message: 'Type age' }]}>
                    <InputNumber min={1} max={120} />
                </Form.Item>
                <Form.Item<FormValues> label="Address" name="address">
                    <Input />
                </Form.Item>
                <Form.Item<FormValues> label="Tags" name="tags">
                    <Select mode="multiple" placeholder="Select tags" options={tags} />
                </Form.Item>
            </Form>
        </Modal>

    );
};

export default UserModal;
