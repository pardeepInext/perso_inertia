import React from 'react'

const CategoryBlog = (blog) => {

    const getText = (str) => {
        str = str.split("</")[0].replace(/<[^>]*>/g, "");
        return str.length > 100 ? `${str.substring(0, 100)}...` : str;
    }


    return (
        <div className="media mb-4 d-flex align-items-center">
            <div className="post-thumb-sm me-3">
                <img className="img-fluid" src={blog.figure} alt="post-thumb" />
            </div>
            <div className="media-body">
                <ul className="list-inline d-flex justify-content-between mb-2">
                    <li className="list-inline-item">Post By {blog.user.name}</li>
                    <li className="list-inline-item">{blog.blog_date}</li>
                </ul>
                <h6><a className="text-dark" href={route('blogs.show', { blog: blog.id })} dangerouslySetInnerHTML={{ __html: getText(blog.discription) }}></a></h6>
            </div>
        </div>

    )
}

export default CategoryBlog
