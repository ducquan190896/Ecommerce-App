const initalState = {
    reviews: [],
    review: null,
    reviewSuccess: false,
    reviewError: false,
    message: null
}

export default ( state= initalState, action) => {
    switch(action.type) {
        case "get_reviews_by_product":
            return {
                ...state,
                reviews: action.payload,
                reviewSuccess: true,
            }
        case "add_review_authUser":
            return {
                ...state,
                reviews: state.reviews.push(action.payload),
                review: action.payload,
                reviewSuccess: true
            }
        case "error_review":
            return {
                ...state,
                reviewError: true,
                messsage: action.payload
            }
        case "reset_review":
            return {
                ...state,
                reviewError: false,
                reviewSuccess: false,
                message: null
            }
        default: 
        return state;
    }
}