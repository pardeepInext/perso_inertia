
require('./bootstrap');

import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'

import NProgress from 'nprogress'
import { Inertia } from '@inertiajs/inertia'
import { Notify } from 'notiflix';

NProgress.configure({ showSpinner: false });

Inertia.on('start', e => e.detail.visit.method == 'get' && NProgress.start())

Inertia.on('progress', (event) => {

    if (NProgress.isStarted() && event.detail.progress.percentage) {
        NProgress.set((event.detail.progress.percentage / 100) * 0.9)
    }

})

Inertia.on('finish', (event) => {

    if (!NProgress.isStarted()) {
        return
    } else if (event.detail.visit.completed) {
        NProgress.done()
    } else if (event.detail.visit.interrupted) {
        NProgress.set(0)
    } else if (event.detail.visit.cancelled) {
        NProgress.done()
        NProgress.remove()
    }

})


Notify.init({
    position: 'right-bottom',
    success: {
        background: '#e36c0b'
    }
});


createInertiaApp({
    resolve: name => import(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(<App {...props} />, el)
    },
})

