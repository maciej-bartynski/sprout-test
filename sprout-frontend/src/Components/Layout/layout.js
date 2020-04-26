import React from 'react';
import css from './layout.scss';

const Layout = props => {

    const { title = "", children } = props;

    return(
        <main className={css.root}>
            <h1 className={css.title}>{title}</h1>
            <section className={css.section}>
                { children }
            </section>
        </main>
    )
}

export default Layout