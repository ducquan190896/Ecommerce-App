import AsyncStorage from "@react-native-async-storage/async-storage"

export const getReviewByProduct = (id) => async (dispatch, getState) => {
    try {
        const res = await fetch(`http://10.0.2.2:8080/api/reviews/product/${id}`)
        const data = await  res.json()
        console.log(data)
        dispatch({
            type: "get_reviews_by_product",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_review",
            payload: err
        })
    }
}

//Authenticated user access
export const addReview = (obj) => async (dispatch, getState) => {
    try{
        const token = await AsyncStorage.getItem("token")

        const res = await fetch("http://10.0.2.2:8080/api/reviews/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(obj)
            
        })

        const data = await res.json()
        console.log(data)

        dispatch({
            type: "add_review_authUser",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_review",
            payload: err
        })
    }
    
}
export const resetReview = () => (dispatch, getState) => {
    dispatch({
        type: "reset_review"
    })
}