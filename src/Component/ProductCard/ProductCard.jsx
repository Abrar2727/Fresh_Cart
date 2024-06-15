import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/Cart.context';



export default function ProductCard({ productInfo }) {
    const { images, title, category, price, ratingsAverage, id } = productInfo;
    const { addProductToCart } = useContext(cartContext);
    return (
        <>
            <div className='shadow-lg rounded-md overflow-hidden col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 '>
                <div className='relative'>
                    <img className='w-full' src={images[0]} alt="" />
                    <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-300 absolute left-0 top-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center gap-3">
                        <div
                        onClick={() => { addProductToWish({ id }) }}
                        className="icon hover:scale-110 transition-all duration-300 hover:rotate-6 cursor-pointer h-10 w-10 bg-primary text-white rounded-full text-sm flex justify-center items-center">

                            <i className='fa-solid fa-heart'></i>
                        </div>
                        <div
                            onClick={() => { addProductToCart({ id }) }}
                            className="icon hover:scale-110 transition-all duration-300 hover:rotate-6 cursor-pointer h-10 w-10 bg-primary text-white rounded-full text-sm flex justify-center items-center">
                            <i className='fa-solid fa-cart-shopping'></i>
                        </div>
                        <Link to={`/products/${id}`} className="icon hover:scale-110 transition-all duration-300 hover:rotate-6 cursor-pointer h-10 w-10 bg-primary text-white rounded-full text-sm flex justify-center items-center">
                            <i className='fa-solid fa-eye'></i>
                        </Link>
                    </div>
                </div>
                <div className='p-3'>
                    <h3 className=' text-primary'>{category.name}</h3>
                    <h2 className='text-lg font-semibold line-clamp-2'>{title}</h2>
                    <div className='flex justify-between items-center mt-4'>
                        <span>{price}L.E</span>
                        <div className='flex gap-2 items-center'>
                            <i className='text-yellow-400 fa-solid fa-star'></i>
                            <span>{ratingsAverage}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
