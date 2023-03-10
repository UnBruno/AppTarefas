import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'


import Login from "../pages/Login/Index";
import Home from "../pages/Home/Index";
import Cadastro from "../pages/Cadastro/Index";


const Stack = createNativeStackNavigator();

export default function Routes(){

  return(
    <Stack.Navigator>

      <Stack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false
				}}
			/>

      <Stack.Screen
				name="Home"
				component={Home}
				options={{
					headerShown: false
				}}
			/>

      <Stack.Screen
				name="Cadastro"
				component={Cadastro}
				options={{
					headerShown: false
				}}
			/>


    </Stack.Navigator>

  )
}