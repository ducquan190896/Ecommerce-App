export const getProducts =  () => async (dispatch, getState) => {
    try {
        const res = await fetch("http://10.0.2.2:8080/api/products/all")
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_products",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_product",
            payload: err
        })
    }
}
export const getProductById =  (id) => async (dispatch, getState) => {
    try {
        const res = await fetch(`http://10.0.2.2:8080/api/products/Id/${id}`)
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_product",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_product",
            payload: err
        })
    }
}
export const getProductsByCategory =  (category) => async (dispatch, getState) => {
    try {
        const res = await fetch(`http://10.0.2.2:8080/api/products/category/${category}`)
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_products_category",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_product",
            payload: err
        })
    }
}
export const getProductsByBrand =  (brand) => async (dispatch, getState) => {
    try {
        const res = await fetch(`http://10.0.2.2:8080/api/products/brand/${brand}`)
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_products_brand",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_product",
            payload: err
        })
    }
}
export const getProductsByName =  (name) => async (dispatch, getState) => {
    try {
        const res = await fetch(`http://10.0.2.2:8080/api/products/name/${name}`)
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_products_name",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_product",
            payload: err
        })
    }
}
export const resetProducts = () => (dispatch, getState) => {
    dispatch({
        type: "reset_product"
    })
}