import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {TailwindProvider} from 'tailwind-rn';
import Store from './Reducers/Store';
import AdminHome from './Screens/AdminHome';
import BillingAddressScreen from './Screens/BillingAddressScreen';
import CartScreen from './Screens/CartScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import CreateProductScreenAdmin from './Screens/CreateProductScreenAdmin';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import OrderDetailScreen from './Screens/OrderDetailScreen';
import OrderDetailScreenAdmin from './Screens/OrderDetailScreenAdmin';
import OrdersScreenOfAdmin from './Screens/OrdersScreenOfAdmin';
import OrdersScreenOfUser from './Screens/OrdersScreenOfUser';
import OrdersScreenOfUserIDByAdmin from './Screens/OrdersScreenOfUserIDByAdmin';
import ProductScreen from './Screens/ProductScreen';
import ProductsListAdmin from './Screens/ProductsListAdmin';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddress from './Screens/ShippingAddress';
import UpdateProductScreenAdmin from './Screens/UpdateProductScreenAdmin';
import UsersScreenAdmin from './Screens/UsersScreenAdmin';
import utilities from './tailwind.json';

// const stack = createNativeStackNavigator()
export default function App() {
  return (
   
    <TailwindProvider utilities={utilities}>  
      
    <Provider store={Store}>
    <StatusBar backgroundColor='#22e3dd'></StatusBar>
   
    {/* <NavigationContainer>
        <stack.Navigator>
          <stack.Screen options={{headerShown: false}} name="Home" component={Home}></stack.Screen>
        </stack.Navigator>
    </NavigationContainer> */}
    
    {/* <ProductScreen></ProductScreen> */}
    {/* <LoginScreen></LoginScreen> */}
    {/* <RegisterScreen></RegisterScreen> */}
    {/* <ChangePasswordScreen></ChangePasswordScreen> */}
    {/* <CartScreen></CartScreen> */}
    {/* <ShippingAddress></ShippingAddress> */}
    {/* <BillingAddressScreen></BillingAddressScreen> */}
    {/* <OrdersScreenOfUser></OrdersScreenOfUser> */}
    {/* <OrderDetailScreen></OrderDetailScreen> */}
    {/* <AdminHome></AdminHome> */}
    {/* <OrdersScreenOfAdmin></OrdersScreenOfAdmin> */}
    {/* <OrderDetailScreenAdmin></OrderDetailScreenAdmin> */}
    {/* <UsersScreenAdmin></UsersScreenAdmin> */}
    {/* <OrdersScreenOfUserIDByAdmin></OrdersScreenOfUserIDByAdmin> */}
    {/* <ProductsListAdmin></ProductsListAdmin> */}
    {/* <UpdateProductScreenAdmin></UpdateProductScreenAdmin> */}
    <CreateProductScreenAdmin></CreateProductScreenAdmin>
    </Provider>
 
  </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
