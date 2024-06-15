import React from 'react';
import amazonePayLogo from "../../assets/images/amazon-pay.png";
import americanExpressLogo from "../../assets/images/American-Express-Color.png";
import mastercardLogo from "../../assets/images/mastercard.webp";
import PaypalLogo from "../../assets/images/paypal.png";
import googleplay from "../../assets/images/get-google-play.png";
import appStore from "../../assets/images/get-apple-store.png";


export default function Footer() {
    return (
        <>
            <footer className='bg-slate-100 py-4 absolute right-0 left-0 bottom-0'>
                <div className="container">
                    <h2 className='text-2xl font-semibold'>Get the FreshCart App</h2>
                    <p className='my-3'>We Will send you a link, open it on your phone to download the app</p>
                    <div className='flex gap-4'>
                        <input type="text" className='form-control flex-grow' placeholder='Email.....' />
                        <button className='btn-primary'>Share App Link</button>
                    </div>

                    <div className='flex justify-between items-center mt-4'>
                        <div className='flex items-center gap-4'>
                            <span>Payment Partners</span>
                            <img src={amazonePayLogo} className='w-16 ' alt="" />
                            <img src={americanExpressLogo} className='w-16 ' alt="" />
                            <img src={mastercardLogo} className='w-16 ' alt="" />
                            <img src={PaypalLogo} className='w-16 ' alt="" />
                        </div>
                        
                        <div className='flex items-center gap-4'>
                            <span>Get deliveries with FresCart</span>
                            <img src={googleplay} className='w-16 ' alt="" />
                            <img src={appStore} className='w-16 ' alt="" />
                           
                        </div>
                    </div>
                </div>



            </footer>
        </>
    )
};
