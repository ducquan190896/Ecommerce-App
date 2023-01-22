import AsyncStorage from "@react-native-async-storage/async-storage"

export const LoginUser = (form) => async (dispatch, getState) => {
    try {
        const res = await fetch("http://10.0.2.2:8080/api/users/login", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        console.log(response.headers)
        await AsyncStorage.setItem("token", response.headers.map["authorization"])
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "login_user",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_user",
            payload: err
        })
    }
}

export const registerUser = (form) => async (dispatch, getState) => {
    try {
        const res = await fetch("http://10.0.2.2:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        console.log(response.headers)
        await AsyncStorage.setItem("token", response.headers.map["authorization"])
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "register_user",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_user",
            payload: err
        })
    }
}
export const logoutUser = (form) => async (dispatch, getState) => {
    try {


        await AsyncStorage.setItem("token", "")
        dispatch({
            type: "logout_user",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_user",
            payload: err
        })
    }
}

export const ChangePasswordUser = (form) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const res = await fetch("http://10.0.2.2:8080/api/users/changepassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "change_password_user",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_user",
            payload: err
        })
    }
}

export const resetUser = () => (dispatch, getState) => {
    dispatch({type: "reset_user"})
}