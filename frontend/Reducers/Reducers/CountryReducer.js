const initalState = {
    countries: [],
    country: null,
    countrySuccess: false,
    countryError: false,
    message: null
}

export default (state = initalState, action) => {
    switch(action.type) {
        case "get_countries":
            return {
                ...state,
                countries: action.payload,
                countrySuccess: true
            }
        case "error_country":
            return {
                ...state,
                countryError: true,
                message: action.payload
            }
        case "reset_country":
            return {
                ...state, 
                countryError: false,
                countrySuccess: false,
                message: null
            }
        default:
            return state;
    }
}