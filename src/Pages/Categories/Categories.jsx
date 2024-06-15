import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Component/Loading/Loading';
import { Helmet } from 'react-helmet';

export default function CategoriesPage() {
    const [categories, setCategories] = useState(null);

    async function getCategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET',
        };
        const { data } = await axios.request(options);
        setCategories(data.data);
        console.log(data);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
         <Helmet>
            <title>Categories</title>
            <meta name='description' content='Categories page' />
        </Helmet>
        <div>
            <h1 className='text-3xl font-bold text-center pb-4 '>Categories</h1>
            {categories ? (
                <div className='grid grid-cols-12 gap-6'>
                    {categories.map((category) => (
                        <>
                            <div key={category._id} className='col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3  shadow-lg rounded-md overflow-hidden bg-slate-200'>
                                <img className='w-full object-cover h-72' src={category.image} alt="" />
                                <h2 className='text-2xl font-semibold text-center py-5'>{category.name}</h2>
                            </div>
                        </>

                    ))}
                </div>
            ) : (
                <Loading/>
            )}
        </div>
        </>
       
    );
}
