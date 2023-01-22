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
export const addReview = (obj) => async (dispatch, getState) => {
    
}
export const resetReview = () => (dispatch, getState) => {
    dispatch({
        type: "reset_review"
    })
}