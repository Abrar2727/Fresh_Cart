import React from 'react'
import './App.css'
import Layout from './Component/Layout/Layout'
import { RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import NotFound from './Pages/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import Home from './Pages/Home/Home'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import UserProvider from './Component/Context/User.context'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Cart from './Pages/Cart/Cart'
import CartProvider from './Component/Context/Cart.context'
import Checkout from './Pages/Checkout/Checkout'
import AllOrders from './Pages/AllOreders/AllOrders'
import Product from './Pages/Product/Product'
import Categories from './Pages/Categories/Categories'
import Brands from './Pages/Brands/Brands'

function App() {
  const routes = createBrowserRouter([
    {
      path: "/", element:
        (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
      children: [
        { index: true, element: <Home /> },
        { path: "/category/:id", element: <h2>Category</h2> },
        { path: "/products/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/products", element: <Product /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands/> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "*", element: <NotFound /> }
      ]
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> }
      ]
    }
  ])
  return (
    <>

      <UserProvider>
        <CartProvider>
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </CartProvider>
      </UserProvider>
    </>
  )
}

export default App;

