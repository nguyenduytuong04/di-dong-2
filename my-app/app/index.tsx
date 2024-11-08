import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Forgotpassword from './screens/Forgotpassword';
import Productdetail from './screens/HomeTabs/Productdetail';
import CheckInfoScreen from './screens/HomeTabs/CheckInfoScreen';
import OrderStatusDetails from './screens/HomeTabs/OrderStatusDetails';
import ProductItem from './screens/HomeTabs/items/ProductItem';


const Stack = createNativeStackNavigator();

const MyApp = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Details" component={DetailsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Forgot" component={Forgotpassword} />
        <Stack.Screen options={{ headerShown: false }} name="Productdetail" component={Productdetail} />
        <Stack.Screen options={{ headerShown: false }} name="CheckInfoScreen" component={CheckInfoScreen} />
        <Stack.Screen options={{ headerShown: false }} name="OrderStatusDetails" component={OrderStatusDetails} />
        <Stack.Screen options={{ headerShown: false }} name="ProductItem" component={ProductItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;

const styles = StyleSheet.create({});
