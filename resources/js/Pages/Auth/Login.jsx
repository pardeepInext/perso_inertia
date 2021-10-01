import React, { useState } from 'react';
import Auth from '../../layouts/Auth';
import AuthImage from '../../components/AuthImage';
import { Link, useForm, Head } from '@inertiajs/inertia-react';
const Login = (props) => {

    const [isShow, setisShow] = useState(false);
    const { data, setData, progress, post, errors } = useForm({
        email: '',
        password: ''
    })
    return (
        <Auth>
            <Head title="Login" />
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <AuthImage />
                        <div className="col-lg-6">
                            <div className="card2 card border-0 px-4 py-5">
                                {/* <SocialLogin /> */}
                                <div className="row px-3 mb-4">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">
                                            Email Address
                                    </h6>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter a valid email address"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email && <span className="fw-bold text-danger">{errors.email}</span>}
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label>
                                    <input
                                        type={isShow ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <span className="fw-bold text-danger">{errors.password}</span>}
                                </div>
                                <div className="row px-3 mb-4">
                                    <a
                                        className="ml-auto mb-0 text-sm float-end"
                                        onClick={() =>
                                            setisShow((prevState) => !prevState)
                                        }
                                    >
                                        {isShow ? "Hide" : "Show"}
                                    </a>
                                    <a href="#" className="ml-auto mb-0 text-sm">
                                        Forgot Password?
                                </a>
                                </div>
                                <div className="row mb-3 px-3">
                                    <button
                                        type="button"
                                        className="btn btn-blue btn-primary text-center"
                                        disabled={progress}
                                        onClick={() => post(route('login'))}
                                    >
                                        {progress ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
                                    </button>
                                </div>
                                <div className="row mb-4 px-3">
                                    <small className="font-weight-bold">
                                        Don't have an account?
                                    <Link
                                            className="text-danger "
                                            href={route('register')}
                                        >
                                            Register
                                    </Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Auth>
    )
}

export default Login
