import React, { useState, useEffect } from 'react';
import scss from './signupContent.scss';

const SignupContent = props => {
    const [content, useContent] = useState("Ładuję...");

    useEffect(() => {
        fetch('/api/signup', {
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
        <p className={scss.parag}>This is <strong>signup page</strong> static content.</p>
        <p className={scss.parag}>
            If everything went good, there is static image below:<br />
            <img
                alt="Something wrong with static assets"
                src='/static/signup.jpg'
            />
        </p>
        <p className={scss.parag}>This is fetched content below:</p>
        <p className={scss.fetched}>{content}</p>
    </div>
    )
}

export default SignupContent;