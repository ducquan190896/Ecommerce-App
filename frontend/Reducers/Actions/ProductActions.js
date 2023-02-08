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

//admin access
export const updateProduct = (productId, form) => async (dispatch, getState) => {
    try {
        const token = await AsyncStorage.getItem("token")
        console.log(form)
       const {active, unitsInStock, price, description, name, priceDiscounted} = form 
       
    //    &priceDiscounted=${priceDiscounted}
        
        let url = `http://10.0.2.2:8080/api/products/Id/${productId}?unitsInStock=${unitsInStock}&price=${price}&description=${description}&active=${active}`;

        if(active) {
            url = url + `&priceDiscounted=${priceDiscounted}`
        }
        if(name) {
            url =  url + `&name=${name}`
        }
      
        const res = await fetch(url, {
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

//admin access
export const openUpdateStatus = (updatedProduct) => (dispatch, getState) => {
    dispatch({
        type: "show_update_status",
        payload: updatedProduct
    })
}

//admin access
export const createProduct = (product) => async (dispatch, getState) => {
    try {
          const token = await AsyncStorage.getItem("token")
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