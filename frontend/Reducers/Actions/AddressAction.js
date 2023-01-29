import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAddressById = (id) => async (dispatch, getState) => {
    try {
       const token = await AsyncStorage.getItem("token")
        const res = await fetch(`http://10.0.2.2:8080/api/address/id/${id}`, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log(data)

        dispatch({
            type: "get_address",
            payload: data
        })
        

    } catch (err) {
        dispatch({
            type: "error_address",
            payload: err
        })
    }
}

export const addShippingAddress = (form) => async (dispatch, getState) => {
    try {
       const token = await AsyncStorage.getItem("token")
        console.log(form)
        const res = await fetch("http://10.0.2.2:8080/api/address/shippingAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)

        dispatch({
            type: "add_shipping_address",
            payload: data
        })
        

    } catch (err) {
        dispatch({
            type: "error_address",
            payload: err
        })
    }
}

export const addBillingAddress = (form) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const res = await fetch("http://10.0.2.2:8080/api/address/billingAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)

        dispatch({
            type: "add_billing_address",
            payload: data
        })
        

    } catch (err) {
        dispatch({
            type: "error_address",
            payload: err
        })
    }
}

export const updateBillingAddress = (id, form) => async (dispatch, getState) => {
    try {
       // const token = await AsyncStorage.getItem("token")
        const res = await fetch(`http://10.0.2.2:8080/api/address/id/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token1
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)
        if(!data.billing) {
            dispatch({
                type: "error_address",
                payload: err
            })
        } else {  
        dispatch({
            type: "update_billing_address",
            payload: data
        })
        }

    } catch (err) {
        dispatch({
            type: "error_address",
            payload: err
        })
    }
}
export const updateShippingAddress = (id, form) => async (dispatch, getState) => {
    try {
       // const token = await AsyncStorage.getItem("token")
        const res = await fetch(`http://10.0.2.2:8080/api/address/id/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token1
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)

        if(!data.shipping) {
            dispatch({
                type: "error_address",
                payload: err
            })
        } else {
            dispatch({
                type: "update_shipping_address",
                payload: data
            })
        }

    } catch (err) {
        dispatch({
            type: "error_address",
            payload: err
        })
    }
}
export const showUpdateBillingStatus = () => (dispatch, getState) => {
    dispatch({
        type: "update_billing_address"
    })
}

export const showUpdateShippingStatus = () => (dispatch, getState) => {
    dispatch({
        type: "update_shipping_address"
    })
}

export const resetAddress = () => (dispatch, getState) => {
    dispatch({
        type: "reset_address"
    })
}