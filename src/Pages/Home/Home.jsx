import React, { useEffect, useState } from 'react';
import ProductCard from '../../Component/ProductCard/ProductCard';
import axios from 'axios';
import Loading from '../../Component/Loading/Loading';
import HomeSlider from '../../Component/HomeSlider/HomeSlider';
import { data } from 'autoprefixer';
import CategorySlider from '../../Component/CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';


export default function Home() {
    const [products, setProuducts] = useState(null);

    async function getProduct() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/products",
            method: 'GET'
        }
        const { data } = await axios.request(options);
        setProuducts(data.data)
        // console.log(data);
    }

    useEffect(() => {
        getProduct();
    }, []);



    return (
        <>

        <Helmet>
            <title>Home</title>
            <meta name='description' content='Welcome to home page' />
        </Helmet>
        <HomeSlider/>
        <CategorySlider />
            {products ? (
                <div className='grid grid-cols-12 gap-4'>
                    {products.map((product) => (<ProductCard productInfo={product} key={product._id} />))
                    }
                </div>)
                : (<Loading />)}

        </>
    )
};
