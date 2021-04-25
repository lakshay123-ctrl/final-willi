
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createAppContainer,createSwitchNavigator, getActiveChildNavigationOptions} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import TranscactionScreen from './booktransactionscreen'
import SearchScreen from './searchscreen'
import LoginScreen from './loginScreen'


export default class library extends React.Component{
  render(){
  return (
    <AppContainer/>
  );
  }
}

const TabNavigator = createBottomTabNavigator({
Transcaction:{screen:TranscactionScreen},
Search:{screen:SearchScreen}
},
{

defaultNavigationOptions:({navigation})=>({tabBarIcon:()=>{
  const routeName = navigation.state.routeName
  if (routeName==="Transcaction"){
    return(
      <Image
      style = {{width:40,height:40}}
      source = {require("./assets/book.png")}
      />
    )
  }
  else if(routeName === "Search"){
    
    return(
      <Image
      style = {{width:40,height:40}}
      source = {require("./assets/searchingbook.png")}
      />
    )

    }

}})
})

 const switchNavigator = createSwitchNavigator({
   LoginScreen:{screen:LoginScreen},
   TabNavigator:{screen:TabNavigator}
 })

const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
