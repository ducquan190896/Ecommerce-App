const initalState = {
    cart: [],
    cartSuccess: false,
    cartError: false,
    message: null
}

export default (state = initalState, action) => {
    switch(action.type) {
        case "get_cart_authUser":
            return {
                ...state,
                cart: action.payload,
                cartSuccess: true
            }
        case "add_to_cart":
            return {
                ...state,
                cart: action.payload,
                cartSuccess: true
            }
        case "minus_from_cart": 
            return {
            ...state,
            cart: action.payload,
            cartSuccess: true
        }
        case "clear_cart":
            return {
                ...state,
                cart: action.payload,
                cartSuccess: true
            }
        case "error_cart":
            return {
                ...state,
                cartError: true,
                message: action.payload
            }
        case "reset_cart":
            return {
                ...state,
                cartError: false,
                cartSuccess: false
            }
        default:
            return state;
    }
}