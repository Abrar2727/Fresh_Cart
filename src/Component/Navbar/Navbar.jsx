import { NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg"
import { Link } from "react-router-dom";

import React, { useContext } from 'react';
import { userContext } from "../Context/User.context";
import { cartContext } from "../Context/Cart.context";


export default function Navbar() {
    const { token, logOut } = useContext(userContext);
    const {cartInfo} = useContext(cartContext)

    return (
        <>
            <nav className="bg-slate-200 p-3 fixed right-0 left-0 top-0 z-50">
                <div className='container flex items-center gap-8'>
                    <h1>
                        <a href="/">
                            <img src={logo} alt="logo" />
                        </a>
                    </h1>

                    {token ? (<>
                    <ul className="flex items-center gap-4 ">
                        <li>
                            <NavLink className={({ isActive }) => {
                                return `relative before:h-[2px] hover:before:w-full before:absolute before:left-0 before:bottom-[-3px] before:bg-primary before:transition-all before:duration-300 hover:font-bold 
                                 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => {
                                return `relative before:h-[2px] hover:before:w-full before:absolute before:left-0 before:bottom-[-3px] before:bg-primary before:transition-all before:duration-300 hover:font-bold 
                                 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/products">Products</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => {
                                return `relative before:h-[2px] hover:before:w-full before:absolute before:left-0 before:bottom-[-3px] before:bg-primary before:transition-all before:duration-300 hover:font-bold 
                                 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/categories">Categories</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => {
                                return `relative before:h-[2px] hover:before:w-full before:absolute before:left-0 before:bottom-[-3px] before:bg-primary before:transition-all before:duration-300 hover:font-bold 
                                 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/brands">Brands</NavLink>
                        </li>

                    

                        <li>
                            <NavLink className={({ isActive }) => {
                                return `relative before:h-[2px] hover:before:w-full before:absolute before:left-0 before:bottom-[-3px] before:bg-primary before:transition-all before:duration-300 hover:font-bold 
                                 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/allorders">Orders</NavLink>
                        </li>
                    </ul>
                    
                    <Link to="/cart" className="relative ms-auto">
                        <i className="fa-solid fa-cart-shopping text-lg">
                            <span className="bg-primary flex justify-center items-center top-0 translate-x-1/2 -translate-y-1/2 right-0 text-white w-5 h-5 p-1 rounded-full text-sm absolute ">
                                {cartInfo ===null ? <i className="fa-solid fa-spinner fa-spin"></i>:
                                cartInfo.numOfCartItems || 0
                                }
                            </span>
                        </i>
                    </Link>
                  
                    
                    </>
                ) : ("")}

                    

                <ul className="flex items-center gap-4">
                    <li>
                        <a href="https://www.instagram.com">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.tiktok.com">
                            <i className="fa-brands fa-tiktok"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </li>
                </ul>

                <ul className="flex items-center gap-4">
                    {!token ? (
                        <>
                            <li>
                                <NavLink className={({ isActive }) => {
                                    return `relative before:h-[2px] hover:before:w-full before:absolute before:left-0 before:bottom-[-3px] before:bg-primary before:transition-all before:duration-300 hover:font-bold 
                                 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                }} to="/auth/Login">
                                    Login
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className={({ isActive }) => {
                                    return `relative before:h-[2px] hover:before:w-full before:absolute before:left-0 before:bottom-[-3px] before:bg-primary before:transition-all before:duration-300 hover:font-bold 
                                 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                }} to="/auth/SignUp">
                                    Sign Up
                                </NavLink>
                            </li>

                        </>
                    ) : (
                        <li className="cursor-pointer">
                            <span 
                            onClick={logOut}>
                                <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </nav >
        </>
    )
};
