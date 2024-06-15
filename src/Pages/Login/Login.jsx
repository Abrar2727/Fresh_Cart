import { data } from 'autoprefixer';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { userContext } from '../../Component/Context/User.context';
import { Helmet } from 'react-helmet';

export default function Login() {
    const [errorMsg, setErrorMsg] = useState();
    const { token, setToken } = useContext(userContext);
    console.log(token);
    const navigate = useNavigate();

    const validationShcema = Yup.object({
        email: Yup.string().required("email is required").email("email is not valid"),
        password: Yup.string().required("Password is required").matches(/^[A-Z][0-9a-z-A-Z]{5,25}$/, "password should start with uppercase letter and then some numbers"),
    })


    async function sendDataToLogin(values) {
        let id;
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
                method: "POST",
                data: values
            };

            id = toast.loading("Waiting.....");
            const { data } = await axios.request(options);
            toast.dismiss(id);
            toast.success("User Loggedin successfully");

            console.log("Helloooooo");
            console.log();

            setTimeout(() => {
                if (data.message === "success") {
                    localStorage.setItem("token", data.token)
                    setToken(data.token)
                    console.log(token);
                    navigate("/");
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

            "email": "",
            "password": "",
        },
        validationSchema: validationShcema,
        onSubmit: sendDataToLogin,
    })

    // console.log(formik);
    return <>
    <>
    <Helmet>
            <title>Login</title>
            <meta name='description' content='Login page' />
        </Helmet></>
        <section>
            <h2 className='text-3xl font-bold text-primary pb-5 '>
                <i className='fa-regular fa-circle-user me-3'></i>
                <span>Login Now</span></h2>

            <form action="" className='s space-y-4' onSubmit={formik.handleSubmit}>

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
                    {errorMsg ? (<div className='mt-2 font-semibold text-red-600'>* {errorMsg}</div>) : ("")}
                </div>


                <button type='submit' className='btn-primary'>Login</button>
            </form>
        </section>

    </>
};
