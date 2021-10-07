import React, { useEffect } from 'react'
import Master from '../layouts/Master';
import { Head, Link } from '@inertiajs/inertia-react';
import Category from '../components/Category';
import Blog from '../components/Blog';
import { Notify } from 'notiflix';

const Index = ({ asset, blogs, categories, status, unreadcount, currentUser }) => {

    useEffect(() => {
        if (status) Notify.success(status);
    }, [status]);

    return (
        <Master asset={asset} unreadcount={unreadcount} currentUser={currentUser}>
            <Head title="Parsa" />
            <div className="container-fluid p-sm-0 category" id="category">
                <div className="content">
                    <div className="d-flex">
                        {categories.map((category) => (
                            <Category key={category.id} {...category} />
                        ))}
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="row blog-listing">
                        {blogs.data.map((blog, key) => (
                            <Blog
                                {...blog}
                                key={blog.id}
                                blogClass={key % 2 === 0 ? "" : "article-right"}
                            />
                        ))}
                    </div>
                    <div className="row" id="blog-paginate">
                        <div className="col-12">
                            <nav>
                                <ul className="pagination justify-content-center align-items-center">
                                    {blogs.links.map((page, key) => (
                                        <li className="page-item" key={key}>
                                            { page.active ?
                                                (

                                                    <span className="page-link"
                                                        dangerouslySetInnerHTML={{ __html: page.label }}
                                                    ></span>
                                                )
                                                :
                                                (
                                                    <Link
                                                        className={`page-link`}
                                                        href={page.url != 'null' ? page.url : 'javascrip:void(0);'} only={['blogs']}
                                                        dangerouslySetInnerHTML={{ __html: page.label }}
                                                    >
                                                    </Link>
                                                )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </Master >
    )
}

export default Index
