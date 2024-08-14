import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface User {
  email: string;
  username: string;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [user, setUser] = useState<User | null>(null);
  const [loading,setLoading] = useState(true);

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

        const res = await axios.get(`http://localhost:3000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user information:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched or an error occurs
      }
    };

    fetchUserInfo();
  }, []);

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if(!user){
    navigation.navigate('LoginPage');
    return <Text>No User information available.</Text>

  }

  if (loading) {
    // Show a loading spinner or a placeholder while data is being fetched
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text>{user?.email}</Text>
      <Text className="font-bold text-2xl">{user?.username}</Text>
      <Button
        title="Go To SignUpPage"
        onPress={() => navigation.navigate('SignUpPage')}
      />
      <Button
        title = "Go to Goals Page"
        onPress={() => navigation.navigate('GoalsPage')}
      />
    </View>
  );
};

export default HomeScreen;
