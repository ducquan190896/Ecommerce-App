const initalState = {
    brands: [],
    brand: null,
    brandSuccess: false,
    brandError: false,
    message: null
}

export default (state = initalState, action) => {
    switch(action.type) {
        case "get_brands":
            return {
                ...state,
                brands: action.payload,
                brandSuccess: true
            }
        case "error_brand":
            return {
                ...state,
                brandError: true,
                message: action.payload
            }
        case "reset_brand":
            return {
                ...state, 
                brandError: false,
                brandSuccess: false,
                message: null
            }
        default:
            return state;
    }
}