import React from 'react';
import { Link } from 'react-router-dom';
import css from './navigation.scss';

const Navigation = () => {
    return (
        <nav className={css.navi}>
            <Link
                className={css.link}
                to={'/'}
            >
                Home
            </Link>
            <Link
                className={css.link}
                to={'/signin'}
            >
                Signin
            </Link>
            <Link
                className={css.link}
                to={'/signup'}
            >
                Signup
            </Link>
        </nav>
    )
}

export default Navigation;