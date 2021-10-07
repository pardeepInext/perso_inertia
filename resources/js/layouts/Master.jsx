import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/inertia-react';
import Footer from '../components/Footer';
import bootstrap from 'bootstrap'
import { Notify } from 'notiflix';
const Master = ({ asset, children, unreadcount, currentUser }) => {

    const [search, setsearch] = useState("");
    const [scroll, setscroll] = useState(false);
    const [newUnreadcount, setnewUnreadcount] = useState(unreadcount);
    const menuElm = useRef(null)
    const [menus] = useState([
        {
            menuClass: "fas fa-home",
            route: "home",
        },
        {
            menuClass: "fas fa-bell ",
            route: "notification",
        },
        {
            menuClass: "fas fa-plus",
            route: "add",
        },
        {
            menuClass: 'fab fa-facebook-messenger',
            route: 'message'
        },
        {
            menuClass: "fas fa-user",
            route: 'user'
        }

    ]);

    const scrollMethod = e => {

    };

    useEffect(() => {

        window.addEventListener('scroll', scrollMethod);

        Echo.private(`like.${currentUser.id}`)
            .notification((notification) => {
                console.log(notification);
                setnewUnreadcount(prev => prev + 1)
            });

        return () => {
            window.removeEventListener('scroll', scrollMethod)
        }
    }, []);


    return (
        <>
            <header className="navigation headroom headroom--pinned headroom--top scroll" ref={menuElm}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link href={route('home')} className="navbar-brand">
                        <img className="img-fluid" src={`${asset}images/logo.png`} alt="parsa" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse text-center"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto">
                            {menus.map((menu, key) => (

                                <li className="nav-item" key={key}>
                                    <Link className={`nav-link text-uppercase text-dark icon-link
                                      ${route().current(menu.route) && 'active'}
                                    `}
                                        style={{ fontSize: "2rem" }}
                                        href={route(menu.route)}
                                    >
                                        <i className={`${menu.menuClass} ${menu.route === 'notification' && `position-relative`} `}>
                                            {(menu.route == 'notification' && unreadcount > 0) && (
                                                <span
                                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill link-notification"
                                                >
                                                    {newUnreadcount < 99 ? newUnreadcount : '99+'}
                                                </span>

                                            )}
                                        </i>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <form className="form-inline position-relative ml-lg-4">
                            <input
                                className="form-control px-0 w-100"
                                type="input"
                                placeholder="Search"
                                onChange={e => setsearch(e.target.value)}
                            />
                            {
                                search.length > 0 &&
                                <Link href={route('search', { qry: search })} className="search-icon" as="button">
                                    <i
                                        className="fas fa-search text-dark"
                                        style={{ color: "#ababab" }}
                                    ></i>
                                </Link>
                            }
                        </form>
                    </div>
                </nav>
            </header>
            {children}
            <Footer asset={asset} />
        </>
    )
}

export default Master
