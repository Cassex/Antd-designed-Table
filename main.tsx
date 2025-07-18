import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './features/styles/App.css'
import App from './features/entities/App'
import {Provider} from 'react-redux'
import {ConfigProvider} from "antd";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={{token: {colorPrimary: '#8130cb'}}}>
            <App/>
        </ConfigProvider>
   </StrictMode>,
)
