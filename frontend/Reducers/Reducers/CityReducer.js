const initalState = {
    cities: [],
    city: null,
    citySuccess: false,
    cityError: false,
    message: null
}

export default (state = initalState, action) => {
    switch(action.type) {
        case "get_cities":
            return {
                ...state,
                cities: action.payload,
                citySuccess: true
            }
        case "get_cities_by_country":
            return {
                ...state,
                cities: action.payload,
                citySuccess: true
            }
        case "error_city":
            return {
                ...state,
                cityError: true,
                message: action.payload
            }
        case "reset_city":
            return {
                ...state, 
                cityError: false,
                citySuccess: false,
                message: null
            }
        default:
            return state;
    }
}