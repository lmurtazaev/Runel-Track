import React from 'react';

import { TrackerPluginProvider } from '@weavix/tracker-plugin-sdk-react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <TrackerPluginProvider>
            <App />
        </TrackerPluginProvider>
    </React.StrictMode>,
);
