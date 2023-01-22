const initalState = {
    categories: [],
    category: null,
    categorySuccess: false,
    categoryError: false,
    message: null
}

export default (state = initalState, action) => {
    switch(action.type) {
        case "get_categories":
            return {
                ...state,
                categories: action.payload,
                categorySuccess: true
            }
        case "error_category":
            return {
                ...state,
                categoryError: true,
                message: action.payload
            }
        case "reset_category":
            return {
                ...state, 
                categoryError: false,
                categorySuccess: false,
                message: null
            }
        default:
            return state;
    }
}