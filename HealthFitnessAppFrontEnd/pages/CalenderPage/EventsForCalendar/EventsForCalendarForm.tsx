import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { DatePicker } from '../../../components/nativewindui/DatePicker';
import { Picker } from '@react-native-picker/picker';





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


    const openPicker = () => {
        setIsPickerVisible(true);
        Animated.timing(pickerHeight, {
            toValue: 200, // Height of the picker
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const closePicker = () => {
        Animated.timing(pickerHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setIsPickerVisible(false));
    };


    const handleAddEvent = async () => {

    }

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
                <Text className='text-lg mb-2'>Select importance of Event</Text>
                <DatePicker
                    value={date}
                    mode='datetime'
                    onChange={(ev) => {
                        setDate(new Date(ev.nativeEvent.timestamp));
                    }}
                />
            </View>
            <View className='mb-4'>
                <Text className='text-lg mb-2'>Level of importance </Text>
                <TouchableOpacity
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.importance ? 'border-red-500 border-2' : ''}`}
                    onPress={openPicker}
                >
                    <Text className='text-lg'>
                        {formData.importance ? `${formData.importance} ` : 'Select Time'}
                    </Text>
                </TouchableOpacity>
                {errors.importance ? <Text className='text-red-500'>{errors.importance}</Text> : null}
            </View>

            <TouchableOpacity
                className='bg-black p-2 rounded-lg mb-4'
                onPress={handleAddEvent}
            >
                <Text className='text-white text-center text-lg'>Add Event</Text>
            </TouchableOpacity>

            {/* Animated View for Picker */}
            {isPickerVisible && (
                <Animated.View style={{ height: pickerHeight, overflow: 'hidden', backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                    <Picker
                        selectedValue={formData.importance}
                        onValueChange={(value) => {
                            setFormData({ ...formData, importance: value });
                            closePicker();
                        }}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Picker.Item label='1 Low' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3 Medium' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5 High' value='5' />
                     
                    </Picker>
                </Animated.View>
            )}
        </View>




    )
}


export default EventsForCalendarForm;