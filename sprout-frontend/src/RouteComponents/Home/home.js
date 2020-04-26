import React, { useState, useLayoutEffect, useEffect } from 'react';
import Layout from './../../Components/Layout';
import HomeContent from './../../Components/HomeContent';

const Home = ({ webSocket }) => {
    const [ counter, setCounter ] = useState(null);

    const count = (type) => (e) => {
        if (type === 'add') webSocket.send('add')
        if (type === 'remove') webSocket.send('remove')
    }

    useEffect(()=>{
        webSocket.onmessage = (msg) => {
            const response = JSON.parse(msg.data || '{}') || { counter: 'something went wrong'}
            setCounter(response.counter)
        }
    }, [])

    return (
        <Layout title='Home'>
            <HomeContent/>
            <div>
                Websocket result:
                { counter }
            </div>
            <button onClick={count('add')}>
                Websocket counter: ADD
            </button>
            <button onClick={count('remove')}>
                Websocket counter: REMOVE
            </button>
        </Layout>
    )
}

export default Home