import AsyncStorage from "@react-native-async-storage/async-storage"

//Authenticated user access
export const getAuthUserCart = () => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        
        console.log(token)
        const res = await fetch("http://10.0.2.2:8080/api/cart/getCartOfAuthUser", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log(data)

        dispatch({
            type: "get_cart_authUser",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_cart",
            payload: err
        })
    }
}

//Authenticated user access
export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    try {
        console.log("add to cart from dispatch")
        const token = await AsyncStorage.getItem("token")
        console.log(token)
        const res = await fetch(`http://10.0.2.2:8080/api/cart/addToCart/product/${productId}/quantity/${quantity}`, {
            method: "PUT",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log(data)

        dispatch({
            type: "add_to_cart",
            payload: data
        })
        

    } catch (err) {
        dispatch({
            type: "error_cart",
            payload: err
        })
    }
}
//Authenticated user access
export const minusFromCart = (productId, quantity) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        console.log(token)
        const res = await fetch(`http://10.0.2.2:8080/api/cart/minusFromCart/product/${productId}/quantity/${quantity}`, {
            method: "PUT",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log(data)

        dispatch({
            type: "minus_from_cart",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_cart",
            payload: err
        })
    }
}
//Authenticated user access
export const ClearCart = () => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        console.log(token)
        const res = await fetch("http://10.0.2.2:8080/api/cart/clearCart", {
            method: "PUT",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log(data)

        dispatch({
            type: "clear_cart",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_cart",
            payload: err
        })
    }
}

export const resetCart = () => (dispatch, getState) => {
    dispatch({type: "reset_cart"})
}