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

export const getListUsers = () => async (dispatch, getState) => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDY1NDI5MywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.X_oX5opcOBDTHJft7khYpdAAJiBt3fOS1EsDMgX6sUuRJdPNiJA5I8nKf49LYgzzCIff38HAA6RB0OpYudc8uw"
        const res = await fetch("http://10.0.2.2:8080/api/users/all", {
            method: "GET",
            headers: {
                
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get list users")
        console.log(data)
        dispatch({
            type: "get_list_users",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_user",
            payload: err
        })
    }
}
export const getListUsersBySearchingName = (name) => async (dispatch, getState) => {
    try {
           // const token = await AsyncStorage.getItem("token")
           const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDY1NDI5MywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.X_oX5opcOBDTHJft7khYpdAAJiBt3fOS1EsDMgX6sUuRJdPNiJA5I8nKf49LYgzzCIff38HAA6RB0OpYudc8uw"
        const res = await fetch(`http://10.0.2.2:8080/api/users/searchName/${name}`, {
            method: "GET",
            headers: {
                
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("get list users by name")
        console.log(data)
        dispatch({
            type: "get_list_users_by_search_name",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_user",
            payload: err
        })
    }
}

export const updateUserToAdmin = (id) => async (dispatch, getState) => {
    try {
           // const token = await AsyncStorage.getItem("token")
           const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDY1NDI5MywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.X_oX5opcOBDTHJft7khYpdAAJiBt3fOS1EsDMgX6sUuRJdPNiJA5I8nKf49LYgzzCIff38HAA6RB0OpYudc8uw"
        const res = await fetch(`http://10.0.2.2:8080/api/users/updateToAdmin/${id}`, {
            method: "PUT",
            headers: {
                
                "Authorization": token
            }
        })
        const data = await res.json()
        console.log("update to Admin")
        console.log(data)
        dispatch({
            type: "update_user_to_admin",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_user",
            payload: err
        })
    }
}