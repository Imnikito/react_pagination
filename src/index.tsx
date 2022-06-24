import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import Demo from './Demo';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(<Demo />);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
