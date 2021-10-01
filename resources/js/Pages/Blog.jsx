import React from 'react'
import Master from '../layouts/Master';
import { Head, Link } from '@inertiajs/inertia-react'
import RelatedPost from '../components/RelatedPost';

const Blog = ({ asset, blog, relatedPosts, unreadcount }) => {

    console.log(relatedPosts);

    return (
        <Master asset={asset} unreadcount={unreadcount}>
            <Head title="Blog" />
            <section className="section bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4>{blog.title}</h4>
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
                                    <i className="fas fa-user me-2"></i>
                                    {blog.user.name}
                                </li>
                                <li className="list-inline-item">
                                    <i className="far fa-calendar me-2"></i>
                                    {blog.blog_date}
                                </li>
                            </ul>
                            <img
                                src={blog.figure}
                                alt="post-thumb"
                                className="w-100 img-fluid mb-4"
                            />
                            <div className="content pb-1" dangerouslySetInnerHTML={{ __html: blog.discription }}></div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget">
                                <h6 className="mb-4">Related  Post</h6>
                            </div>
                            {relatedPosts.length > 0 ?
                                relatedPosts.map(relatedPost => (<RelatedPost
                                    key={relatedPost.id}
                                    {...relatedPost}
                                />))
                                :
                                (<h5>No Related Post Available</h5>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Master >
    )
}

export default Blog;
