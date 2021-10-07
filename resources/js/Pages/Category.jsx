import React from 'react'
import Master from '../layouts/Master';
import { Head, Link } from '@inertiajs/inertia-react'
import CategoryBlog from '../components/CategoryBlog';

const Category = (props) => {
    const { category, blogs } = props;

    return (
        <Master asset={props.asset} unreadcount={props.unreadcount} currentUser={props.currentUser}>
            <Head title="Category" />
            <section className="section bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="text-capitalize">{category.name}</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container blog-details">
                    <div className="row">
                        <div className="col-lg-8">
                            <ul className="list-inline d-flex justify-content-between py-3">
                                <li className="list-inline-item">
                                    <i className="fab fa-blogger-b"></i>
                                    Total Posts {blogs.length}
                                </li>
                            </ul>
                            <img
                                src={category.figure}
                                alt="post-thumb"
                                className="w-100 img-fluid mb-4"
                            />
                            <div className="content pb-1" ></div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget">
                                <h6 className="mb-4">Some Latest Posts</h6>
                            </div>
                            {blogs.length > 0 ?
                                blogs.map(blog => (<CategoryBlog
                                    key={blog.id}
                                    {...blog}
                                />))
                                :
                                (<h5>No Post Available</h5>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Master >
    )
}

export default Category
