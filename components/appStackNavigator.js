import {createStackNavigator} from 'react-navigation-stack';
import RequestScreen from '../screens/requestScreen';
import SuggestScreen from '../screens/suggestionScreen';
import RecieverDetails from '../screens/receiverDetails';
import SuggestionDetails from '../screens/suggestionDetails';

export const AppStackNavigator = createStackNavigator({
    RequestScreen : {
      screen : RequestScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    RecieverDetails : {
      screen : RecieverDetails,
      navigationOptions:{
        headerShown : false
      }
    },
    SuggestScreen : {
      screen : SuggestScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    SuggestionDetails : {
      screen : SuggestionDetails,
      navigationOptions:{
        headerShown : false
      }
    },
  
  },
    {
      initialRouteName: 'RequestScreen'
    }
  );