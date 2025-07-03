import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {Provider} from 'react-redux'
import {store} from './store.ts'
import {ConfigProvider} from "antd";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={{ token: { colorPrimary: '#8130cb' } }}>
                <App/>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>,
)
