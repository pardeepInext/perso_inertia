import React from 'react'
import { Link } from '@inertiajs/inertia-react'

const Notification = (notification) => {
    return (
        <div className="alert alert-primary mb-5 notification-alert bg-secondary shadow" role="alert" >
            <figure className="figure">
                <img src={notification.data.user.profile_image} className="figure-img rounded-circle notification-img" alt="..." />
                <figcaption className="figure-caption text-center">{notification.data.user.name}</figcaption>
            </figure>
            {notification.read_at != null ? (<span className="float-end"><i className="fas fa-check"></i>Read</span>) : <a className="float-end">Mark As Read</a>}
            <hr />
            <p>{notification.data.notify} your <Link href={route('blogs.show', { blog: notification.data.blog.id })}>{notification.data.blog.title}</Link></p>
        </div >

    )
}

export default Notification
