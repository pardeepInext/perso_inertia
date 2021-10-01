import React, { useState } from 'react'
import FootInfoCol from './FootInfoCol';
const Footer = ({ asset }) => {

    const [address] = useState({ header: "Address", first: "Sydney", second: "6 rip carl Avenue CA 90733" });
    const [contact] = useState({ header: "Contact Info", first: "Tel: +90 000 333 22", second: "Mail: exmaple@ymail.com" });
    const [socialLinks] = useState(['fa-facebook-f', 'fa-twitter', 'fa-linkedin-in', 'fa-github-alt']);
    return (
        <footer className="bg-secondary">
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 mb-4 mb-md-0">
                            <a href="/"><img src={`${asset}images/logo.png`} alt="persa" className="img-fluid" /></a>
                        </div>
                        <FootInfoCol  {...address} />
                        <FootInfoCol  {...contact} />
                        <div className="col-md-3 col-sm-6 mb-4 mb-md-0">
                            <h6>Follow</h6>
                            <ul className="list-inline d-inline-block">
                                {socialLinks.map((socialLink, key) => (
                                    <li className="list-inline-item" key={key}>
                                        <a href="/" className="text-dark"><i className={`fab ${socialLink}`}></i></a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
