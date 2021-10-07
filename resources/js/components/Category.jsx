import React, { useState } from "react";
import { Link } from '@inertiajs/inertia-react'
const Category = ({ figure, id, name }) => {

    return (
        <div
            className="col-lg-3 col-sm-6 mb-2 mb-lg-0 px-1 test ms-1 me-1"
            style={{ width: "328px" }}
        >
            <article className="card bg-dark text-center text-white border-0 rounded-0">
                <img
                    className="card-img rounded-0 img-fluid w-100"
                    src={figure}
                    alt="post-thumb"
                    style={{ height: "374px" }}
                />
                <div className="card-img-overlay">
                    <div
                        className="card-content"
                        style={{ marginBottom: "0%" }}
                    >
                        <p className="text-uppercase">{name}</p>
                        <h4 className="card-title mb-4">
                            <Link className="text-white" href={route('category-show', { name: name })}>
                                All blogs of {name}
                            </Link>
                        </h4>
                        <Link
                            className="btn btn-outline-light"
                            href={route('category-show', { name: name })}
                        >
                            read more
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Category;
