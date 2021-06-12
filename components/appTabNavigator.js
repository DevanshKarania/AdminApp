import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RequestScreen from '../screens/requestScreen';
import SuggestScreen from '../screens/suggestionScreen';
import AddMedicines from '../screens/addMedicines';
import {AppStackNavigator} from '../components/appStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    RequestMedicines: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon:
                <Image
                    source={require('../assets/medicines.jpg')}
                    style={{ width: 30, height: 30 }} />,
            tabBarLabel: "Medicines"
        }
    },
    Suggestions: {
        screen: SuggestScreen,
        navigationOptions: {
            tabBarIcon:
                <Image
                    source={require('../assets/suggestion.png')}
                    style={{ width: 30, height: 30 }} />,
            tabBarLabel: "Suggestions"
        }
    },
    AddMedicines: {
        screen: AddMedicines,
        navigationOptions: {
            tabBarIcon:
                <Image
                    source={require('../assets/medicines.jpg')}
                    style={{ width: 30, height: 30 }} />,
            tabBarLabel: "Add Medicines"
        }
    },

})