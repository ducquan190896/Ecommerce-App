export const getCountries = () => async (dispatch, getState) => {
    try {
        const res = await fetch("http://localhost:8080/api/countries/all")
        const data = await res.json()
        console.log(data)
        dispatch({
            type: "get_countries",
            payload: data
        })
    } catch (err) {
        dispatch({
            type: "error_country",
            payload: err
        })
    }
}

export const resetCountry = () => (dispatch, getState) => {
    dispatch({
        type: "reset_country"
    })
}