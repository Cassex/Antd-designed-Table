import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './features/styles/App.css'
import App from './features/components/App'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {ConfigProvider} from "antd";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={{ token: { colorPrimary: '#8130cb' } }}>
                <App/>
            </ConfigProvider>
        </Provider>
    </StrictMode>,
)
