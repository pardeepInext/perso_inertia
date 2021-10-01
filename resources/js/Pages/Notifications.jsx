import React from 'react'
import Master from '../layouts/Master';
import { Head } from '@inertiajs/inertia-react'
const Notifications = ({ asset, unreadcount }) => {
    return (
        <Master asset={asset} unreadcount={unreadcount}>
            <Head title="Notification" />
            <h1>
                Notification
            </h1>
        </Master>
    )
}

export default Notifications
