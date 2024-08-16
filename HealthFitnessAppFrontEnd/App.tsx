import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomePage/HomeScreen';
import CalendarPage from './pages/CalenderPage/CalendarPage';
// import { RootStackParamList } from './types';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AddGoalsPage from './pages/AddGoalsPage/AddGoalsPage';
import './global.css'
import GoalsDashboardPage from './pages/GoalsDashboard/GoalsDashboardPage';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage}/>
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name = 'GoalsPage' component = {AddGoalsPage}/>
        <Stack.Screen name = 'GoalsDashboard' component = {GoalsDashboardPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
