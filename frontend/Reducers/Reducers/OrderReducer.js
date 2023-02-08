const initialState = {
    orders: [],
    openOrders: [],
    closeOrders: [], 
    order: null,
    updateOrderStatus: false,
    orderSuccess: false,
    orderError: false,
    message: null,
    orderUpdated: null 
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "get_authUser_orders":
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true
            }
        case "get_order_by_id":
            return {
                ...state,
                order: action.payload,
                orderSuccess: true
            }
        case "get_open_orders_admin":
            return {
                ...state,
                openOrders: action.payload,
                orderSuccess: true
            }
        case "get_close_orders_admin":
            return {
                ...state,
                closeOrders: action.payload,
                orderSuccess: true
            }
        case "get_orders_of_userId_byAdmin":
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true
            }
        case "update_close_status_order":
            return {
                ...state,
                order: action.payload,
                orderSuccess: true,
                closeOrders: [...state.orders, action.payload],
                openOrders: state.openOrders.filter(ord => ord.id != action.payload.id)
            }
        case "create_order":
            return {
                ...state,
                order: action.payload,
                orderSuccess: true,
                orders: state.orders.push(action.payload)
            }
        case "order_error":
            return {
                ...state,
                orderSuccess: false,
                orderError: true,
                message: action.payload
            }
        case "reset_order":
            return {
                ...state,
                orderSuccess: false,
                orderError: false,
                message: null,
                updateOrderStatus: false,
                orderUpdated: null
            }
        default:
            return state;
    }
}