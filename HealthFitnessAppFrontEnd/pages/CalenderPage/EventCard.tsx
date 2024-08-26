import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

interface Event {
    _id: string;
    event: string;
    date: string;
    importance: string;
}



interface EventCardForEventDashboard {
    event: Event;
    onDeleteEvent: (eventID: string) => void;
}


const EventDashboardCard: React.FC<EventCardForEventDashboard> = ({ event, onDeleteEvent }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleDelete = () => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this goal?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: async () => {
                try {
                  const res = await axios.delete(`http://localhost:3000/goals/${event._id}`);
                  if (res.status === 200) {
                    onDeleteEvent(event._id); // Remove goal from the list
                  } else {
                    throw new Error('Error in deleting goal');
                  }
                } catch (error) {
                  console.log(error);
                }
              },
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
      };


    return (
        <View className='bg-white rounded-2xl m-5 p-4 shadow-lg'>
            <View className='flex-row justify-between items-center mb-2'>
                <Text className='text-xl font-bold text-gray-900'>{event.event}</Text>
                <TouchableOpacity className='p-2 bg-red-100 rounded-full' onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
            </View>
            <Text className='text-gray-700 mb-3'>{event.importance}</Text>
            <View className='flex-row justify-between items-center'>
                <Text className='text-sm text-gray-500'>{event.date}</Text>
            </View>
        </View>
        
    )

}


export default EventDashboardCard