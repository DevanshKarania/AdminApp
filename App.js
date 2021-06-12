import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/loginScreen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppTabNavigator} from './components/appTabNavigator';
import {AppDrawerNavigator} from './components/appDrawerNavigator';

export default class App extends React.Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}
const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  Drawer:{screen: AppDrawerNavigator},
})

const AppContainer =  createAppContainer(switchNavigator);