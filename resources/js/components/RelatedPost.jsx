import React from 'react'
import { Link } from '@inertiajs/inertia-react'
const RelatedPost = (props) => {
    const { id, title, user, blog_date, figure, discription } = props;

    const getText = (str) => {
        str = str.split("</")[0].replace(/<[^>]*>/g, "");
        return str.length > 100 ? `${str.substring(0, 100)}...` : str;
    }

    return (
        <div className="media mb-4 d-flex align-items-center">
            <div className="post-thumb-sm me-3">
                <img className="img-fluid" src={figure} alt="post-thumb" />
            </div>
            <div className="media-body">
                <ul className="list-inline d-flex justify-content-between mb-2">
                    <li className="list-inline-item">
                        Post By {user.name}
                    </li>
                    <li className="list-inline-item">{blog_date}</li>
                </ul>
                <h6>
                    <Link className="text-dark" href={route('blogs.show', { blog: id })}
                        dangerouslySetInnerHTML={{ __html: getText(discription) }}
                    ></Link>
                </h6>
            </div>
        </div>
    );
}

export default RelatedPost;