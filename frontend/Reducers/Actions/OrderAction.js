import AsyncStorage from "@react-native-async-storage/async-storage"

export const resetOrder = () => (dispatch, getState) => {
    dispatch({
        type: "reset_order"
    })
}

export const getOrdersByAuth = () => async (dispatch, getState) => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFuMiIsImV4cCI6MTY3NDU5OTkxNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl19.pyOP4jd_lFA__0bOPg0_EFOhqwtrGyWDD4b08K9RGJl1rHePNqm_C8rdA-TSNHgq0Ktx7Tn32KvdLIR_NIaq6g"
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
export const getOrdersByIdByAuth = (id) => async (dispatch, getState) => {
    try {
         // const token = await AsyncStorage.getItem("token")
         const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFuMiIsImV4cCI6MTY3NDU5OTkxNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl19.pyOP4jd_lFA__0bOPg0_EFOhqwtrGyWDD4b08K9RGJl1rHePNqm_C8rdA-TSNHgq0Ktx7Tn32KvdLIR_NIaq6g"
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
export const getOpenOrdersByAdmin = () => async (dispatch, getState) => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDYwMTk2NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.ZQwpwP7oy38c2cTGiuIZ_LORavFuqi5BdQQ0xgDlMdQ3i-TwIiYMnQyT4eGAMTeiqrKb0HWerwNhtdUimysXCg"
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

export const getCloseOrdersByAdmin = () => async (dispatch, getState) => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const {orders} = getState().ORDERS
        const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDYwMTk2NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.ZQwpwP7oy38c2cTGiuIZ_LORavFuqi5BdQQ0xgDlMdQ3i-TwIiYMnQyT4eGAMTeiqrKb0HWerwNhtdUimysXCg"
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

export const updateCloseStatusOfOrder = (orderId) => async (dispatch, getState) => {
    try {
        // const token = await AsyncStorage.getItem("token")
        
        const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDYwMTk2NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.ZQwpwP7oy38c2cTGiuIZ_LORavFuqi5BdQQ0xgDlMdQ3i-TwIiYMnQyT4eGAMTeiqrKb0HWerwNhtdUimysXCg"
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

export const getOrdersByIdByAdmin = (orderId) => async (dispatch, getState) => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const {orders} = getState().ORDERS
        const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDYwMTk2NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.ZQwpwP7oy38c2cTGiuIZ_LORavFuqi5BdQQ0xgDlMdQ3i-TwIiYMnQyT4eGAMTeiqrKb0HWerwNhtdUimysXCg"
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