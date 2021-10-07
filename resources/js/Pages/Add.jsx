import React, { useState, useRef, useEffect } from 'react'
import Master from '../layouts/Master';
import { Head, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';


const Add = ({ categories, asset, unreadcount, currentUser }) => {

    const { data, setData, errors, progress, post } = useForm({
        category_id: '',
        title: '',
        discription: '',
        img: null,
    });

    const select = useRef(null);
    const [imagePreview, setimagePreview] = useState("");
    const [imageErr, setimageErr] = useState("");
    const [cropper, setCropper] = useState(null);
    const [cropCount, setcropCount] = useState(0);
    const imageElm = useRef(null)

    const [quillModule] = useState({
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ]
    });

    const filePreview = (file) => {

        const reader = new FileReader();
        reader.onload = () => setimagePreview(reader.result);
        reader.readAsDataURL(file);

    }

    const cropImage = () => {

        let canvas = cropper.getCroppedCanvas({
            width: 798,
            height: 345
        });

        canvas.toBlob((blob) => {
            let file = new File([blob], "test")
            filePreview(file);
            setData('img', file);
            setcropCount(1);
        });
    }

    const changeImage = e => {
        setcropCount(0);
        filePreview(e.target.files[0]);
    }

    useEffect(() => {
        let cropper = new Cropper(imageElm.current, {
            aspectRatio: 1,
            viewMode: 3,
        });
        setCropper(cropper);
        if (cropCount > 0) cropper.destroy();
        return () => cropper.destroy();

    }, [imagePreview, cropCount]);

    return (
        <Master asset={asset} unreadcount={unreadcount} currentUser={currentUser} >
            <Head title="Add" />
            <section className="section">
                <div className="container">
                    <select className="form-control" style={{ width: "30%" }}
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                        ref={select}
                    >
                        <option value="">--Select Category--</option>
                        {categories.map((category, key) => (
                            <option key={key} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <span className="text-danger fw-bold">{errors.category_id}</span>}
                    <div className="row my-3">
                        <div className="col-6">
                            <div className="form-group">
                                <input type="text" className="form-control" id="exampleFormControlInput1"
                                    placeholder="add blog title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <span className="text-danger fw-bold">{errors.title}</span>}
                            </div>
                        </div>
                        <div className="col-6 row">
                            <div className="col-4">
                                <label className="btn btn-primary" htmlFor="add-image-input">Add Image</label>
                                <input type="file" className="d-none" id="add-image-input" accept="image/*"
                                    onChange={changeImage}
                                />
                            </div>
                            <div className="col-8">
                                <img src={imagePreview} className="img-fluid mb-1" style={{ objectFit: 'contain' }} ref={imageElm} />
                                {cropCount == 0 && <button className={`btn btn-sm btn-primary mt-1 ${imagePreview.length <= 0 ? 'd-none' : ""}`} onClick={cropImage}>Crop</button>}
                            </div>
                        </div>
                        <div className="col-12 my-3 p-1">
                            <ReactQuill value={data.discription} onChange={value => setData('discription', value)} theme="snow"
                                modules={quillModule}
                            />
                            {errors.discription && <span className="text-danger fw-bold">{errors.discription}</span>}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary float-end" onClick={() => post(route('blogs.store'), { forceFormData: true })}>
                                {progress ? <i className="fas fa-cog fa-spin"></i> : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Master>
    )
}

export default Add
