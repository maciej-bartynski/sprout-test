import React, { useState, useEffect } from 'react';
import scss from './homeContent.scss';

const HomeContent = props => {
    const [content, useContent] = useState("Ładuję...");

    useEffect(() => {
        fetch('/api/home', {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) useContent(res.data.content);
                else useContent('Fetch failed.')
            })
    }, [])

    return (
        <div>
            <p className={scss.parag}>This is homepage static content.</p>
            <p className={scss.parag}>
                If everything went good, there is static image below:<br/>
                <img
                    alt="Something wrong with static assets"
                    src='/static/home.jpg'
                />
            </p>
            <p className={scss.parag}>This is fetched content below:</p>
            <p className={scss.fetched}>{content}</p>
        </div>
    )
}

export default HomeContent;