import AsyncStorage from "@react-native-async-storage/async-storage"

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

export const updateProduct = (productId, form) => async (dispatch, getState) => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDY5NDA3NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.a32jYmC3rm6VLYFvsnWgcJZ4wEg6LjifkzbQZGcRPrYdhX7LQdPF5xN8gIMcASTn7y11NfpF4WjBvbO1Wx3RDw"
       const {active, unitsInStock, price, description, name, priceDiscounted} = form 
        const res = await fetch(`http://10.0.2.2:8080/api/products/Id/${productId}?unitsInStock=${unitsInStock}&priceDiscounted=${priceDiscounted}&price=${price}&description=${description}&name=${name}&active=${active}`, {
            method: "PUT",
            headers: {
                "Authorization": token
            }
        })
        const data = await res.json()

        console.log("update product")
        console.log(data)

        dispatch({
            type: "update_product",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_product",
            payload: err
        })
    }
}
export const openUpdateStatus = (updatedProduct) => (dispatch, getState) => {
    dispatch({
        type: "show_update_status",
        payload: updatedProduct
    })
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
          // const token = await AsyncStorage.getItem("token")
          const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDY5NDA3NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.a32jYmC3rm6VLYFvsnWgcJZ4wEg6LjifkzbQZGcRPrYdhX7LQdPF5xN8gIMcASTn7y11NfpF4WjBvbO1Wx3RDw"
        const res = await fetch("http://10.0.2.2:8080/api/products/", {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)

        })
        const data = await res.json()

        console.log("create product")
        console.log(data)

        dispatch({
            type: "create_product",
            payload: data
        })

    } catch (err) {
        dispatch({
            type: "error_product",
            payload: err
        })
    }
}