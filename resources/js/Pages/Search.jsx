import React from 'react'
import Master from '../layouts/Master';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import SearchData from '../components/SearchData';

const Search = (props) => {
    return (
        <Master asset={props.asset} unreadcount={props.unreadcount} currentUser={props.currentUser}>
            <Head title="Search" />
            <section className="section bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h4>Search Result</h4>
                            <p className="text-muted">search for: {props.qry}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            {Object.keys(props.searchData).length > 0 ?
                                Object.keys(props.searchData).map(key => <SearchData key={key} search={props.searchData[key]} section={key} />)
                                :
                                (
                                    <div className="text-center">
                                        <h4>No Results</h4>
                                        <p className="text-muted">You may want to try searching for something else.</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section >

        </Master >
    )
}

export default Search
