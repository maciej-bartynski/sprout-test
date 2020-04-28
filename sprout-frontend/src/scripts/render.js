import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App/app.js';

const webSocket = new WebSocket(`ws://localhost:8080`);

console.log('process', process.env.mode)

ReactDOM.render(<App />, document.querySelector('#react-root-container'));