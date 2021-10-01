import React, { useState } from "react";
import { Link, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';

const Blog = (props) => {


    const { category, discription, blog_date, figure, id, title, blogClass, likes_count, like_status_count, like_status } =
        props;

    const [isLike, setIsLike] = useState(like_status_count);
    const [likes, setlikes] = useState(likes_count);
    const [isLiking, setisLiking] = useState(like_status);

    const toggleLike = () => {
        setisLiking(!isLiking);
        console.log({ id: id, is_liked: isLiking });
        Inertia.post(route('toggle-like'), { id: id, is_liked: isLiking })
    }

    const getText = (str) => {
        str = str.split("</")[0].replace(/<[^>]*>/g, "");
        return str.length > 100 ? `${str.substring(0, 100)}...` : str;
    }

    return (
        <div className="col-12 mb-100">
            <article
                data-target="article"
                className={`article-full-width ${blogClass}`}
            >
                <div className="post-image">
                    <img className="img-fluid" src={figure} alt="post-thumb" />
                </div>
                <div className="post-content">
                    <ul className="list-inline d-flex justify-content-between border-bottom post-meta pb-2 mb-4">
                        <li className="list-inline-item">
                            <i className="far fa-calendar me-2"></i>
                            {blog_date}
                        </li>
                        <li className="list-inline-item">
                            <i className="fas fa-tags me-2"></i>
                            <span className="eta">{category && category.name}</span>
                        </li>
                        <li className="list-inline-item">
                            <i className={`${isLiking ? `fas fa-heart` : `far fa-heart`} me-2 `} style={{ color: 'red', cursor: 'pointer' }} onClick={toggleLike}></i>
                            <span className="eta">{likes}</span>
                        </li>
                    </ul>
                    <h4 className="mb-4">
                        <Link className="text-dark" href={'/'}>
                            {title}
                        </Link>
                    </h4>
                    <div className="mb-0 post-summary" dangerouslySetInnerHTML={{ __html: getText(discription) }}>
                    </div>
                    <Link
                        className="btn btn-transparent mb-4"
                        href={route('blogs.show', { blog: id })}
                    >
                        Continue...
                        </Link>
                </div>
            </article>
        </div>
    );
};

export default Blog;
