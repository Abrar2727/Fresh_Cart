import React, { useContext, useState } from 'react';
import { cartContext } from '../../Component/Context/Cart.context';
import { userContext } from '../../Component/Context/User.context';
import { data } from 'autoprefixer';
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Checkout() {
    const { cartInfo, setCartInfo } = useContext(cartContext);
    const { token } = useContext(userContext);
    const [orderType, setOrderType] = useState(null);
    const navigate = useNavigate()

    async function createCashOrder(values) {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
            method: "POST",
            headers: {
                token,
            },
            data: {
                values,
            }
        }

        let { data } = await axios.request(options);
        setCartInfo([]);
        setTimeout(() => {
            navigate("/allorders")
        }, 2000);
    }

    async function createOnlineOrder(values) {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:3000`,
            method: "POST",
            headers: {
                token,
            },
            data: {
                values,
            }
        }

        let { data } = await axios.request(options);
        toast.loading("Loading to paymen page")

        setTimeout(() => {
            if (data.status === "success") {
                window.location.href = data.session.url;
            }
        }, 3000);
    }

    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: "",
            },
        },

        onSubmit: (values) => {
            if (orderType === "cash") createCashOrder(values);
            else createOnlineOrder(values);
        },
    });

    return (
        <>
            <h3 className='text-2xl font-bold'>Shipping Address</h3>
            <form onSubmit={formik.handleSubmit}>
                <input type="text"
                    className='form-control w-full mb-4'
                    placeholder='City'
                    name='shippingAddress.city'
                    value={formik.values.shippingAddress.city}
                    onChange={formik.handleChange}
                />

                <input type="tel"
                    className='form-control w-full mb-4'
                    placeholder='Phone'
                    name='shippingAddress.phone'
                    value={formik.values.shippingAddress.phone}
                    onChange={formik.handleChange}
                />

                <textarea type="text"
                    className='form-control w-full mb-4'
                    placeholder='details'
                    name="shippingAddress.details"
                    value={formik.values.shippingAddress.details}
                    onChange={formik.handleChange}
                ></textarea>

                <button
                    onClick={() => {
                        setOrderType('cash')
                    }}
                    type='submit' className='btn-primary bg-blue-500 mr-4'>Cash Order</button>
                <button
                    onClick={() => {
                        setOrderType("online")
                    }}
                    type='submit' className='btn-primary'>Online Order</button>
            </form>
        </>
    )
};
