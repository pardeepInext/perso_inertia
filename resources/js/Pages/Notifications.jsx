import React, { useState, useEffect } from 'react'
import Master from '../layouts/Master';
import { Head } from '@inertiajs/inertia-react';
import Notification from '../components/Notification'
const Notifications = ({ asset, unreadcount, currentUser, notifications }) => {

    const [newNotifications, setnewNotifications] = useState(notifications);
    useEffect(() => {

        Echo.private(`like.${currentUser.id}`)
            .notification((notification) => {

                let newNotification = {
                    data: {
                        blog: notification.blog,
                        user: notification.user,
                        notify: notification.notify
                    },
                    id: notification.id,
                    read_at: null,
                }
                setnewNotifications(prev => [...prev, newNotification]);
            });

    }, []);

    return (
        <Master asset={asset} unreadcount={unreadcount} currentUser={currentUser}>
            <Head title="Notification" />
            <section className="section">
                <h4 className="text-center mb-5">Notifications</h4>
                <div className="container">
                    {newNotifications.length != 0 ?
                        newNotifications.map(notification => <Notification key={notification.id} {...notification} />) :
                        (<h4 className="text-center text-muted">No nofication available</h4>)
                    }
                </div>
            </section>
        </Master>
    )
}

export default Notifications
