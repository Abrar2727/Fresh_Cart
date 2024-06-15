import React from 'react';
import notFound from "../../assets/images/error.svg"


export default function NotFound(){

    return <>
    <img src={notFound} alt="error" className='mx-auto mt-8' />
    </>
};
