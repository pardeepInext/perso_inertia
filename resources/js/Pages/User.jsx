import React, { useState } from 'react'
import Master from '../layouts/Master';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { Confirm } from 'notiflix';

const User = ({ asset, unreadcount, user }) => {


    const setDetails = (properyName) => user.user_details != null ? user.user_details[properyName] : '';

    const { data, setData, errors, post, progress } = useForm({
        country_id: '',
        state_id: '',
        city_id: '',
        img: null,
        mobile_number: setDetails('mobile_number'),
        address: setDetails('address'),
        postcode: setDetails('postcode')
    });

    const [selectedCountry, setselectedCountry] = useState(setDetails('country_id') ? {
        label: user.user_details.country.name,
        value: user.country_id
    } : "");


    const [image, setimage] = useState(user.profile_image);
    const loadCountry = async (q, callback) => {
        const results = [];
        await axios.get(route('country', { q: q }))
            .then(res => res.data.map(country => results.push({ label: country.name, value: country.id })))
        callback(results);

    }

    const [selectedState, setselectedState] = useState(setDetails('state_id') ? {
        label: user.user_details.state.name,
        value: user.state_id
    } : "");

    const loadStates = async (q, callback) => {
        const results = [];
        await axios.get(route('state', { q: q }), {
            params: {
                id: data.country_id
            }
        })
            .then(res => res.data.map(state => results.push({ label: state.name, value: state.id })))
        callback(results);
    }

    const [selectedCity, setselectedCity] = useState(setDetails('city') ? {
        label: user.user_details.city.name,
        value: user.city_id
    } : "");

    const loadCities = async (q, callback) => {
        const results = [];
        await axios.get(route('city', { q: q }), {
            params: {
                id: data.state_id
            }
        })
            .then(res => res.data.map(city => results.push({ label: city.name, value: city.id })))

        callback(results);
    }

    const imagePriview = e => {

        const reader = new FileReader();
        reader.onload = () => setimage(reader.result);
        reader.readAsDataURL(e.target.files[0]);
        setData('img', e.target.files[0]);
    }

    return (
        <Master asset={asset} unreadcount={unreadcount} currentUser={user}>
            <Head title="User" />
            <div className="container rounded bg-white">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <label htmlFor="profile-pic-input" style={{ cursor: 'pointer' }}>
                                <img className="mt-5" width="150px" src={image}
                                    height="150px" style={{ objectFit: 'contain' }}
                                />
                            </label>
                            <span className="text-muted">Tip:For changing profile image tap on image</span>
                            <input type="file" className="d-none" id="profile-pic-input" onChange={imagePriview} accept="image/*" />
                            <span className="font-weight-bold mt-3">{user.name}</span>
                            <span className="text-black-50">{user.email}</span><span> </span>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 d-flex align-items-center justify-content-around">
                                    <span className="text-black-50 me-2">Email ID</span>
                                    <span className="text-black-50">{user.email}</span><span> </span>
                                    <button className="btn btn-outline-primary btn-sm">Change Email</button>
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Mobile Number</label>
                                    <input type="text" className="form-control"
                                        placeholder="enter phone number"
                                        value={data.mobile_number} onChange={e => setData('mobile_number', e.target.value)}
                                    />
                                    {errors.mobile_number && <span className="fw-bold text-danger">{errors.mobile_number}</span>}
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Address</label>
                                    <input type="text" className="form-control" placeholder="enter address"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        autoComplete="off"
                                    />
                                    {errors.address && <span className="fw-bold text-danger">{errors.address}</span>}
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Postcode</label>
                                    <input type="text" className="form-control" placeholder="enter postcode"
                                        value={data.postcode}
                                        onChange={e => setData('postcode', e.target.value)}
                                    />
                                    {errors.postcode && <span className="fw-bold text-danger">{errors.postcode}</span>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div className="col-md-12">
                                        <label className="labels">Country</label>
                                        <AsyncSelect
                                            cacheOptions={true}
                                            defaultOptions={false}
                                            loadOptions={loadCountry}
                                            className="form-control"
                                            placeholder="Select Country"
                                            value={selectedCountry}
                                            onChange={value => {
                                                setData('country_id', value.value)
                                                setselectedCountry(value.lable)
                                            }}
                                        />
                                        {errors.country_id && <span className="fw-bold text-danger">{errors.country_id}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label className="labels">State/Region</label>
                                    <AsyncSelect
                                        cacheOptions={true}
                                        defaultOptions={false}
                                        value={selectedState}
                                        loadOptions={loadStates}
                                        className="form-control"
                                        isDisabled={data.country_id != "" ? false : true}
                                        placeholder="select states"
                                        onChange={option => {
                                            setselectedState(option.lable);
                                            setData('state_id', option.value)
                                        }}
                                    />
                                    {errors.country_id && <span className="fw-bold text-danger">{errors.country_id}</span>}
                                </div>
                                <div className="col-md-6"><
                                    label className="labels">City</label>
                                    <AsyncSelect
                                        cacheOptions={true}
                                        defaultOptions={false}
                                        value={selectedCity}
                                        loadOptions={loadCities}
                                        className="form-control"
                                        isDisabled={data.state_id != "" ? false : true}
                                        placeholder="select city"
                                        onChange={option => {
                                            setselectedCity(option.lable);
                                            setData('city_id', option.value)
                                        }}
                                    />
                                    {errors.state_id && <span className="fw-bold text-danger">{errors.state_id}</span>}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button type="button"
                                    className="btn btn-primary"
                                    onClick={() => post(route('user-details'), data, { forceFormData: true, })}
                                >
                                    {progress ? <i class="fas fa-spinner fa-pulse"></i> : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 py-2">
                        <Link className="btn btn-primary float-end logout"
                            method="post"
                            as="button"
                            href={route('logout')}
                            onBefore={e => confirm('Are you sure ?')}
                        >Logout</Link>
                    </div>
                </div>
            </div>
        </Master >
    )
}

export default User
