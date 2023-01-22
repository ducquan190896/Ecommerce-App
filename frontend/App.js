import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {TailwindProvider} from 'tailwind-rn';
import Store from './Reducers/Store';
import CartScreen from './Screens/CartScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import ProductScreen from './Screens/ProductScreen';
import RegisterScreen from './Screens/RegisterScreen';
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
    <ChangePasswordScreen></ChangePasswordScreen>
    {/* <CartScreen></CartScreen> */}
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
