export const getCities = () => async (dispatch, getState) => {
    try {
        const res = await fetch("http://10.0.2.2:8080/api/cities/all")
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_cities",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "error_city",
            payload: err
        })
    }
}
export const getCitiesByCountry = (country) => async (dispatch, getState) => {
    try {
        const res = await fetch(`http://10.0.2.2:8080/api/cities/countryName/${country}`)
        
        const data = await res.json()
        //console.log(data)
        dispatch({
            type: "get_cities_by_country",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "error_city",
            payload: err
        })
    }
}

export const resetCity = () => (dispatch, getState) => {
    dispatch({
        type: "reset_city"
    })
}