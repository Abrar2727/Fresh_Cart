import { data } from 'autoprefixer';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { Helmet } from 'react-helmet';

export default function Register() {
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    const validationShcema = Yup.object({
        name: Yup.string().required("name is required").min(3, "name must be more than 3 characters").max(15, "name must be less than 15 characters"),
        email: Yup.string().required("email is required").email("email is not valid"),
        phone: Yup.string().required().matches(phoneRegex, 'Phone number is not valid'),
        password: Yup.string().required("Password is required").matches(/^[A-Z][0-9a-z-A-Z]{5,25}$/, "password should start with uppercase letter and then some numbers"),
        rePassword: Yup.string().required("re-Password  is required").oneOf([Yup.ref("password")], "re Password and password should be the same"),

    })


    async function sendDataToRegister(values) {
        let id;
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                method: "POST",
                data: values
            };

            id = toast.loading("Waiting.....");
            const { data } = await axios.request(options);
            toast.dismiss(id);
            toast.success("user created successfully");

            console.log("Helloooooo");
            console.log(data);

            setTimeout(() => {
                if (data.message === "success") {
                    navigate("/auth/Login");
                }
            }, 2000);
        }
        catch (error) {
            toast.dismiss(id)
            toast.error(error.response.data.message)
            setErrorMsg(error.response.data.message);

        }
    }


    const formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        validationSchema: validationShcema,
        onSubmit: sendDataToRegister,
    })

    // console.log(formik);
    return <>
     <Helmet>
            <title>Register</title>
            <meta name='description' content='Register page' />
        </Helmet>
        <section>
            <h2 className='text-3xl font-bold text-primary pb-5 '>
                <i className='fa-regular fa-circle-user me-3'></i>
                <span>Register Now</span></h2>

            <form action="" className='s space-y-4' onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" name="name" className='form-control w-full' placeholder='userName'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.errors.name && formik.touched.name ? (
                        <div className='font-semibold text-red-600 mt-2'>
                            *{formik.errors.name}
                        </div>) : ("")
                    }
                </div>
                <div>
                    <input type="email" name="email" className='form-control w-full' placeholder='Email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className='mt-2 font-semibold text-red-600'>
                            *{formik.errors.email}
                        </div>
                    ) : ("")}
                    {errorMsg ? (<div className='mt-2 font-semibold text-red-600'>* {errorMsg}</div>) : ("")}
                </div>
                <div>
                    <input type="tel" name="phone" className='form-control w-full' placeholder='Phone'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.phone && formik.touched.phone ? (<div className='mt-2 font-semibold text-red-600'>
                        *{formik.errors.phone}
                    </div>) : ("")}
                </div>
                <div>
                    <input type="password" name="password" className='form-control w-full' placeholder='Password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ? (<div className='mt-2 font-semibold text-red-600'>
                        *{formik.errors.password}
                    </div>) : ("")}
                </div>
                <div>
                    <input type="password" name="rePassword" className='form-control w-full' placeholder='Re-password'
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword ? (<div className='mt-2 font-semibold text-red-600'>
                        *{formik.errors.rePassword}
                    </div>) : ("")}
                </div>

                <button type='submit' className='btn-primary'>Sign up</button>
            </form>
        </section>

    </>
};
