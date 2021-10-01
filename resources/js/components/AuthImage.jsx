import React from 'react'
import authImage from '../../images/auth.png'

const AuthImage = () => {
    return (
        <div className="col-lg-6">
            <div className="card1 pb-5">
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                    <img
                        src={authImage}
                        className="image"
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthImage
