import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { DatePicker } from '../../../components/nativewindui/DatePicker';






const EventsForCalendarForm = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [date, setDate] = React.useState(new Date());


    const [formData, setFormData] = useState({
        event: "",
        importance: "",
    });
    const [errors, setErrors] = useState({
        event: "",
        importance: "",
    });

    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [pickerHeight] = useState(new Animated.Value(0));
    const [userId, setUserId] = useState("");




    return (
        <View className='flex-1 p-6 bg-gray-100 justify-center'>
            <Text className='font-bold text-2xl text-center mb-8'>Add Event</Text>
            <View className='mb-4'>
                <Text className='text-lg mb-2'>Event</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.event ? 'border-red-500 border-2' : ''}`}
                    placeholder='Event'
                    value={formData.event}
                    onChangeText={(value) => setFormData({ ...formData, event: value })}
                    keyboardType='default'
                />
                {errors.event ? <Text className='text-red-500'>{errors.event}</Text> : null}
            </View>
            <View className='mb-4 items-center rounded-lg'>
                <Text className='text-lg mb-2'>Select time of Event</Text>
                <DatePicker
                    value={date}
                    mode='datetime'
                    onChange={(ev) => {
                        setDate(new Date(ev.nativeEvent.timestamp));
                    }}
                />
            </View>



        </View>
    )
}


export default EventsForCalendarForm;