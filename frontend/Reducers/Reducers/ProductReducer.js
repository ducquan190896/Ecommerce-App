const initialState = {
    products: [],
    product: null,
    productSuccess: false,
    productError: false,
    message: null,
    updateStatus: false,
    updatedProduct: null,
    brandStatus: false,
    nameStatus: false,
    categoryStatus: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "get_products":
            return {
                ...state,
                products: action.payload,
                productSuccess: true
            }
        case "get_product":
            return {
                ...state,
                product: action.payload,
                productSuccess: true
            }
        case "show_update_status": 
            return {
                ...state,
                updateStatus: true,
                updatedProduct: action.payload
            }
        case "update_product":
            return {
                ...state,
                updatedProduct: action.payload,
                products: state.products.map(pro => pro.id == action.payload.id ? action.payload : pro),
                productSuccess: true,
                updateStatus: false
            }
        case "create_product":
            return {
                ...state,
                product: action.payload,
                products: [...state.products, action.payload],
                productSuccess: true
            }
         case "get_products_category":
                return {
                    ...state,
                    products: action.payload,
                    productSuccess: true
                }   
        case "get_products_brand":
                return {
                      ...state,
                    products: action.payload,
                    productSuccess: true
                    }   
        case "get_products_name":
                return {
                   ...state,
                products: action.payload,
                productSuccess: true
                 }                       
        case "error_product":
            return {
                ...state,
                productError: true,
                message: action.payload
            }
        case "reset_product":
            return {
                ...state,
                productError: false,
                productSuccess: false,
                message: null,
                updateStatus: false,
                brandStatus: false,
                nameStatus: false,
                categoryStatus: false
            }
        default: 
            return state;
    }
}