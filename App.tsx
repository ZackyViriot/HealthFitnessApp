import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomePage/HomeScreen';
import CalendarPage from './pages/CalenderPage/CalendarPage';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
