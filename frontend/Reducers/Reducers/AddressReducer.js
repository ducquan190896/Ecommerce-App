import { startMapper } from "react-native-reanimated/lib/reanimated2/core"

const initialState = {
    shippingAddress: null,
    billingAddress: null,
    address: null,
    addressSuccess: false,
    addressError: false,
    message: null,
    billingAddressStatus: false,
    shippingAddressStatus: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "get_address":
            return {
                ...state,
                address: action.payload,
                addressSuccess: true
            }
        case "add_shipping_address":
            return {
                ...state,
                shippingAddress: action.payload,
                addressSuccess: true
            }
        case "add_billing_address":
            return {
                ...state,
                billingAddress: action.payload,
                addressSuccess: true
            }
        case "show_update_billing_status": 
            return {
                ...state,
                billingAddressStatus: true,
                addressSuccess: true
            }
        case "update_billing_address":
            return {
                ...state,
                billingAddress: action.payload,
                addressSuccess: true
            }
        case "show_update_shipping_status": 
            return {
                ...state,
                shippingAddressStatus: true,
                addressSuccess: true
            }
        case "update_shipping_address":
                return {
                    ...state,
                    shippingAddress: action.payload,
                    addressSuccess: true
                }
        case "error_address":
            return {
                ...state,
                addressError: true,
                addressSuccess: false,
                message: action.payload
            }
        case "reset_address":
            return {
                ...state,
                addressError: false,
                addressSuccess: false,
                billingAddressStatus: false,
                shippingAddressStatus: false,
                message: null
            }
        default:
            return state;
    }
}