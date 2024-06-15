import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Component/Loading/Loading';
import { Helmet } from 'react-helmet';
export default function BrandsPage() {
    const [brands, setBrands] = useState(null);

    async function getBrands() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/brands',
            method: 'GET',
        };
        const { data } = await axios.request(options);
        setBrands(data.data);
        console.log(data);
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <>
        <Helmet>
            <title>Brands</title>
            <meta name='description' content='Brands page' />
        </Helmet>
        <div>
            <h1 className='text-4xl font-bold text-center pb-4'>Brands</h1>
            {brands ? (
                <div className='grid grid-cols-12 gap-6'>
                    {brands.map((brand) => (
                        <>
                            <div key={brand._id} className='col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3  shadow-lg rounded-md overflow-hidden bg-slate-200'>
                                <img className='w-full object-cover h-72' src={brand.image} alt="" />
                                <h2 className='text-2xl font-semibold text-center py-5'>{brand.name}</h2>
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
