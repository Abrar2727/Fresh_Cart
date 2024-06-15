import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "./User.context";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cartInfo, setCartInfo] = useState(null);
    const { token } = useContext(userContext);

    // async function getCartInfo() {
    //     try {
    //         const option = {
    //             url: "https://ecommerce.routemisr.com/api/v1/cart",
    //             method: "GET",
    //             headers: {
    //                 token
    //             }
    //         }

    //         let { data } = await axios.request(option);
    //         console.log(data);
    //         setCartInfo(data)

    //     } catch {
    //         console.log("error");
    //         if (error.response.data.message.includes("No cart")) {
    //             setCartInfo([]);
    //         }
    //     }
    // }

    async function addProductToWish({ id }) {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId: id
                }
            };

            const { data } = await axios.request(options);
            console.log(data);
            toast.success("Product added to cart");
            setCartInfo(data)
        } catch {
            console.log("error");
        }
    }

    async function removeProductFromCart({ id }) {
        try {
            const option = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "DELETE",
                headers: {
                    token,
                }
            }

            let { data } = await axios.request(option);

            if (data.numOfCartItems === 0) {
                setCartInfo([]);
            } else {
                setCartInfo(data);
            }
            toast.success("Product removed successfully");

        } catch {
            console.log("error");
        }
    }

    async function clearCart() {
        try {
            const option = {
                method: "DELETE",
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                headers: {
                    token,
                },
            };
            let { data } = await axios.request(option);

            if (data.message === "success") {
                setCartInfo([]);
            }
        } catch {
            console.log("error");
        }
    }
    return (
        <cartContext.Provider value={{
            addProductToWish,
            // getCartInfo,
            cartInfo,
            removeProductFromCart,
            updateProductCount,
            clearCart,
            setCartInfo,
        }}>
            {children}
        </cartContext.Provider>
    )
}


