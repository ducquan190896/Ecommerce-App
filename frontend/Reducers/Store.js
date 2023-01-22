import thunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import ProductReducer from "./Reducers/ProductReducer";
import ReviewReducer from "./Reducers/ReviewReducer";
import BrandReducer from "./Reducers/BrandReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
import CityReducer from "./Reducers/CityReducer";
import CountryReducer from "./Reducers/CountryReducer";
import UserReducer from "./Reducers/UserReducer";
import CartReducer from "./Reducers/CartReducer";

const initialState = {}

const rootReducer = combineReducers({
PRODUCTS: ProductReducer,
REVIEWS: ReviewReducer,
BRANDS: BrandReducer,
CATEGORIES: CategoryReducer,
CITIES: CityReducer,
COUNTRIES: CountryReducer,
USERS: UserReducer,
CARTS: CartReducer
})
const middleWare = [thunk]
const Store = createStore( 
    rootReducer, 
    initialState,
   composeWithDevTools( applyMiddleware(...middleWare))
)
export default Store;