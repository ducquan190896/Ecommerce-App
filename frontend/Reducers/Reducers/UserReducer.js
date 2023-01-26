const initalState = {
    users: [],
    user: null,
    userSuccess: false,
    userError: false,
    message: null
}

export default (state = initalState, action) => {
    switch(action.type) {
        case "get_users":
            return {
                ...state,
                users: action.payload,
                userSuccess: true
            }
        case "login_user":
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case "register_user":
            return {
            ...state,
            user: action.payload,
            userSuccess: true
            }
        case "logout_user":
            return {
                ...state,
                user: null,
                userSuccess: true
            }
        case "change_password_user":
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case "get_list_users":
            return {
                ...state,
                users: action.payload,
                userSuccess: true 
            }
        case "get_list_users_by_search_name":
            return {
                ...state,
                users: action.payload,
                userSuccess: true
            }
        case "update_user_to_admin":
            return {
                ...state,
                users: state.users.map(us => us.id == action.payload.id ? action.payload : us),
                userSuccess: true
            }
        case "error_user":
            return {
                ...state,
                userError: true,
                message: action.payload
            }
        case "reset_user":
            return {
                ...state, 
                userError: false,
                userSuccess: false,
                message: null
            }
        default:
            return state;
    }
}