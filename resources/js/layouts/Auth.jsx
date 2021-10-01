import React, { useEffect } from 'react'
import { Link, usePage } from '@inertiajs/inertia-react';
import logo from '../../images/logo.png';
import '../../sass/auth.scss';

const Auth = ({ asset, children }) => {
    const { url } = usePage();
    return (
        <>
            <header className="navigation headroom headroom--pinned headroom--top">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link href={route('home')} className="navbar-brand">
                        <img className="img-fluid" src={logo} alt="parsa" />
                    </Link>
                </nav>

            </header>
            {children}
        </>
    )
}

export default Auth
