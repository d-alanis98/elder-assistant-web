import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//Components
import App from './App';
//Global styles
import './index.css';
import store from './Shared/store/store';

const WithStore = (
    <Provider
        store = { store }
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

ReactDOM.render(WithStore, document.getElementById('root'));

