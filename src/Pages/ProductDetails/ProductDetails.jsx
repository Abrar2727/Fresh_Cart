import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Component/Loading/Loading';
import ReactImageGallery from 'react-image-gallery';
import { cartContext } from '../../Component/Context/Cart.context';
import { Helmet } from 'react-helmet';

export default function ProductDetails() { 

    const [details, useDetails] = useState(null);
    const {addProductToCart} = useContext(cartContext)
    let { id } = useParams();

    async function getProductDetails() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        useDetails(data.data)
    };

    useEffect(() => {
        getProductDetails()
    }, [])
    const imageItems = details?.images.map((imageURL) => {
        return {
            original: imageURL,
            thumbnail: imageURL,
        }
    })
    return <>

        {details === null ? (<Loading />) :
            (<>
             <Helmet>
                <title>{details.title}</title>
                <meta name='description' content={details.description} />
            </Helmet>
            <div className='grid grid-cols-12 '>
                <div className='col-span-3'>
                    <ReactImageGallery
                    items={imageItems}
                    showNav={false}
                    showFullscreenButon={false}
                    showPlayButton={false}        
                    />
                </div>

               

                <div className="col-span-9 ps-8 pt-2">
                    <h2 className='text-2xl font-bold '>{details.title}</h2>
                    <h3 className='text-primary font-semibold mb-4'>{details.category.name}</h3>
                    <p>{details.description}</p>
                    <div className='flex justify-between items-center mt-4'>
                        <span>{details.price} L.E</span>
                        <span><i className='fa-solid fa-star text-yellow-400 mr-1'></i>{details.ratingsAverage}</span>
                    </div>
                    <button
                    onClick={()=>{addProductToCart({id: details.id})}}
                     className='btn-primary w-full mt-6'>Add To Cart</button>
                </div>

            </div>
            </>
               )
        }
    </>
}
