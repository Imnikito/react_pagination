import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import Demo from './Demo';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(<Demo />);
