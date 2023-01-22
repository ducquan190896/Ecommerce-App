export const getBrands = () => async (dispatch, getState) => {
    try {
        const res = await fetch("http://localhost:8080/api/brands/all")
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_brands",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "error_brand",
            payload: err
        })
    }
}

export const resetBrand = () => (dispatch, getState) => {
    dispatch({
        type: "reset_brand"
    })
}