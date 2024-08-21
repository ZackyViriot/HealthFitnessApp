import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoalsDashboardCard from './GoalsDashboardCard'; // Ensure the correct path to the component

interface Goal {
  _id: string;
  goalTitle: string;
  description: string;
  time: string;
}

const GoalsDashboardPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          navigation.navigate('LoginPage');
          return;
        }

        const decoded: any = jwtDecode(token);
        const userId = decoded.id;

        const res = await axios.get(`http://localhost:3000/goals/getUserGoals?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGoals(res.data);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigation]);

  const handleDeleteGoal = (goalId: string) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
  };

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-between">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalsDashboardCard key={goal._id} goal={goal} onDeleteGoal={handleDeleteGoal} />
          ))
        ) : (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-center font-bold text-lg text-gray-700 mb-4'>
              No goals found
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('GoalsPage')}
              className='bg-black p-4  rounded-lg w-11/12 mx-auto'>
              <Text className='text-white text-lg text-center'>Add Goals</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View className="p-4 justify-center items-center">
        <TouchableOpacity 
          onPress={() => navigation.navigate('GoalsPage')}
          className='bg-black p-4 rounded-lg w-1/2 '>
          <Text className='text-white text-lg rounded-xl text-center'>Add Goals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoalsDashboardPage;
