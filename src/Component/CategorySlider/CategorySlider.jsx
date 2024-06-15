import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

export default function CategorySlider() {
    const [categories, setCategories] = useState(null);

    async function getCategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET',
        };
        const { data } = await axios.request(options);
        setCategories(data.data);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {categories ? (
                <section className="py-8">
                    <h2 className="text-lg font-semibold mb-3">Shop Popular Categories</h2>
                    <Swiper loop={true} slidesPerView={6} navigation >
                        {categories.map((category) => (
                            <SwiperSlide key={category._id}>
                                <Link to={`/categories`}>
                                    <img src={category.image} alt="" className="w-full h-72 object-cover" />
                                    <h3>{category.name}</h3>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
}