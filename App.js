import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import Routes from "./src/routes/Index";


export default function App(){
  return(
    <NavigationContainer>

      <Routes/>

    </NavigationContainer>
  );
} 