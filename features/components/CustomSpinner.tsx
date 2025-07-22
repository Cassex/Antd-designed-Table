// components/CustomSpinner.tsx
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import {FC} from 'react';

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const CustomSpinner: FC = () => (
    <Spin
        indicator={antIcon}
        tip="Обновляем пользователей..."
        size="large"
        style={{
            color: '#1890ff',
        }}
    />
);

export default CustomSpinner;
