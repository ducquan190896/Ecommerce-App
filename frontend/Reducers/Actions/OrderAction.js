import AsyncStorage from "@react-native-async-storage/async-storage"

export const resetOrder = () => (dispatch, getState) => {
    dispatch({
        type: "reset_order"
    })
}

//authenticated user access
export const createOrder = (billingAddressId, shippingAddressId) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        
        const res = await fetch(`http://10.0.2.2:8080/api/orders/billingAddress/${billingAddressId}/shippingAddress/${shippingAddressId}`, {
            method: "POST",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get all orders")
        console.log(data)

        dispatch({
            type: "get_authUser_orders",
            payload: data
        })


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}

//authenticated user access
export const getOrdersByAuth = () => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")    
        const res = await fetch("http://10.0.2.2:8080/api/orders/allByAuthUser", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get all orders")
        console.log(data)

        dispatch({
            type: "get_authUser_orders",
            payload: data
        })


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}

//authenticated user access
export const getOrdersByIdByAuth = (id) => async (dispatch, getState) => {
    try {
         const token = await AsyncStorage.getItem("token")
        const res = await fetch(`http://10.0.2.2:8080/api/orders/id/${id}`, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("order by Id")
        console.log(data)

        dispatch({
            type: "get_order_by_id",
            payload: data
        })


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}

//admin access
export const getOpenOrdersByAdmin = () => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const res = await fetch("http://10.0.2.2:8080/api/orders/allByOpenStatus", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get open orders by admin")
        console.log(data)

        dispatch({
            type: "get_open_orders_admin",
            payload: data
        })


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}

//admin access
export const getCloseOrdersByAdmin = () => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const {orders} = getState().ORDERS
        const res = await fetch("http://10.0.2.2:8080/api/orders/allByCloseStatus", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get_close_orders_admin")
        console.log(data)

        dispatch({
            type: "get_open_orders_admin",
            payload: data
        })
    


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}

//admin access
export const updateCloseStatusOfOrder = (orderId) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const res = await fetch(`http://10.0.2.2:8080/api/orders/id/${orderId}`, {
            method: "PUT",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("update_close_status_order")
        console.log(data)

        dispatch({
            type: "update_close_status_order",
            payload: data
        })
    


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}

//admin access
export const getOrdersByIdByAdmin = (orderId) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const {orders} = getState().ORDERS
        const res = await fetch(`http://10.0.2.2:8080/api/orders/id/${orderId}`, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get_order_by_id_admin")
        console.log(data)

        dispatch({
            type: "get_order_by_id",
            payload: data
        })
    


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}

//admin access
export const getordersOfUserIdByAdmin = (userId) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const {orders} = getState().ORDERS
        const res = await fetch(`http://10.0.2.2:8080/api/orders/allByUserId/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get_orders_of_userId_byAdmin")
        console.log(data)

        dispatch({
            type: "get_orders_of_userId_byAdmin",
            payload: data
        })
    


    } catch (err) {
        dispatch({
            type: "order_error",
            payload: err
        })
    }
}