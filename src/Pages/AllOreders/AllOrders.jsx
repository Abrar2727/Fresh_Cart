import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../Component/Context/User.context'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../Component/Loading/Loading';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
    const [orders, setOrders] = useState(null);
    const { token } = useContext(userContext);
    const { id } = jwtDecode(token);

    async function getUserOrders() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: "GET",
        };

        const { data } = await axios.request(options);
        setOrders(data)
    }


    useEffect(() => {
        getUserOrders()
    }, []);

    return (
        <>
        <Helmet>
            <title>Orders</title>
            <meta name='description' content='Orders Page' />
        </Helmet>
            {!orders ? (<Loading />) : (
                orders.map((orders) =>
                    <div className='order border border-gray-300 my-3 shadow-sm rounded-md p-4'>
                        <div className='flex justify-between items-center '>
                            <div>
                                <h2 className='text-gray-400'>Order Id</h2>
                                <h3 className='font-bold'>{orders.id}</h3>
                            </div>
                            <div>

                                {orders.isDeliverd ? (
                                    <span className='btn-primary bg-green-500 inline-block me-2 font-cairo'>
                                        تم التوصيل
                                    </span>
                                ) : (
                                    <span className='btn-primary bg-blue-500 inline-block me-2 font-cairo'>
                                        قيد التوصيل
                                    </span>
                                )}

                                {orders.isPaid ? (
                                    <span className='btn-primary bg-green-500 inline-block font-cairo'>
                                        تم مدفوع
                                    </span>
                                ) : (
                                    <span className='btn-primary bg-red-500 inline-block font-cairo'>
                                        غير مدفوع
                                    </span>
                                )}

                            </div>
                        </div>

                        <div className='grid grid-cols-12 gap-3  mt-5'>
                            {orders.cartItems.map((product) => (
                                <div className='product border border-gray-300 rounded p-3 col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 '>
                                    <img src={product.product.imageCover} className='w-full h-32 object-contain' alt="" />
                                    <h3 className='my-3 font-semibold'>{product.product.title}</h3>
                                    <span>{product.price} L.E</span>
                                </div>
                            ))}

                        </div>
                    </div>
                )
            )}

        </>)
};
