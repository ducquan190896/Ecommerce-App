export const getCategories = () => async (dispatch, getState) => {
    try {
        const res = await fetch("http://10.0.2.2:8080/api/categories/all")
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_categories",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "error_category",
            payload: err
        })
    }
}

export const resetCategory = () => (dispatch, getState) => {
    dispatch({
        type: "reset_category"
    })
}