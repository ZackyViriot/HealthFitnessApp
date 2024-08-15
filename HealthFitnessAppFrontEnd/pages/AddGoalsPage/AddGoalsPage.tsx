import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import axios from 'axios';

const AddGoalsPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [formData, setFormData] = useState({
        goalTitle: "",
        description: "",
        time: "",
    });
    const [errors, setErrors] = useState({
        goalTitle: "",
        description: "",
        time: "",
    });
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [pickerHeight] = useState(new Animated.Value(0)); // Animated value to control the height of the picker

    const validateForm = () => {
        let valid = true;
        let newErrors = { goalTitle: "", description: "", time: "" };

        if (!formData.goalTitle) {
            newErrors.goalTitle = "Goal name is required";
            valid = false;
        }
        if (!formData.description) {
            newErrors.description = "Description is required";
            valid = false;
        }
        if (!formData.time) {
            newErrors.time = "Time to complete goal is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleAddGoal = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/goals/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const token = res.data.token;

            if (token) {
                navigation.navigate('GoalsDashboard');
            }
        } catch (error) {
            console.error(error);
        }
    };

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

    return (
        <View className='flex-1 p-6 bg-gray-100 justify-center'>
            <Text className='font-bold text-2xl text-center mb-8'>Add Goals</Text>

            <View className='mb-4'>
                <Text className='text-lg mb-2'>Goal Name</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.goalTitle ? 'border-red-500 border-2' : ''}`}
                    placeholder='Goal Name'
                    value={formData.goalTitle}
                    onChangeText={(value) => setFormData({ ...formData, goalTitle: value })}
                    keyboardType='default'
                    autoCapitalize='none'
                />
                {errors.goalTitle ? <Text className='text-red-500'>{errors.goalTitle}</Text> : null}
            </View>

            <View className='mb-4'>
                <Text className='text-lg mb-2'>Goal Description</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm h-32 ${errors.description ? 'border-red-500 border-2' : ''}`}
                    placeholder='Goal Description'
                    value={formData.description}
                    onChangeText={(value) => setFormData({ ...formData, description: value })}
                    keyboardType='default'
                    autoCapitalize='none'
                    multiline={true}
                />
                {errors.description ? <Text className='text-red-500'>{errors.description}</Text> : null}
            </View>

            <View className='mb-4'>
                <Text className='text-lg mb-2'>Time To Complete Goal (Days)</Text>
                <TouchableOpacity
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.time ? 'border-red-500 border-2' : ''}`}
                    onPress={openPicker}
                >
                    <Text className='text-lg'>
                        {formData.time ? `${formData.time} Days` : 'Select Time'}
                    </Text>
                </TouchableOpacity>
                {errors.time ? <Text className='text-red-500'>{errors.time}</Text> : null}
            </View>

            <TouchableOpacity
                className='bg-black p-2 rounded-lg mb-4'
                onPress={handleAddGoal}
            >
                <Text className='text-white text-center text-lg'>Add Goal</Text>
            </TouchableOpacity>

            {/* Animated View for Picker */}
            {isPickerVisible && (
                <Animated.View style={{ height: pickerHeight, overflow: 'hidden', backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}>
                    <Picker
                        selectedValue={formData.time}
                        onValueChange={(value) => {
                            setFormData({ ...formData, time: value });
                            closePicker();
                        }}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Picker.Item label='1 Day' value='1' />
                        <Picker.Item label='2 Days' value='2' />
                        <Picker.Item label='3 Days' value='3' />
                        <Picker.Item label='4 Days' value='4' />
                        <Picker.Item label='5 Days' value='5' />
                        <Picker.Item label='6 Days' value='6' />
                        <Picker.Item label='7 Days' value='7' />
                        <Picker.Item label='8 Days' value='8' />
                        <Picker.Item label='9 Days' value='9' />
                        <Picker.Item label='10 Days' value='10' />
                        <Picker.Item label='11 Days' value='11' />
                        <Picker.Item label='12 Days' value='12' />
                        <Picker.Item label='13 Days' value='13' />
                        <Picker.Item label='14 Days' value='14' />
                        <Picker.Item label='15 Days' value='15' />
                        <Picker.Item label='16 Days' value='16' />
                        <Picker.Item label='17 Days' value='17' />
                        <Picker.Item label='18 Days' value='18' />
                        <Picker.Item label='19 Days' value='19' />
                        <Picker.Item label='20 Days' value='20' />
                        <Picker.Item label='21 Days' value='21' />
                        <Picker.Item label='22 Days' value='22' />
                        <Picker.Item label='23 Days' value='23' />
                        <Picker.Item label='24 Days' value='24' />
                        <Picker.Item label='25 Days' value='25' />
                        <Picker.Item label='26 Days' value='26' />
                        <Picker.Item label='27 Days' value='27' />
                        <Picker.Item label='28 Days' value='28' />
                        <Picker.Item label='29 Days' value='29' />
                        <Picker.Item label='30 Days' value='30' />
                    </Picker>
                </Animated.View>
            )}
        </View>
    );
};

export default AddGoalsPage;
