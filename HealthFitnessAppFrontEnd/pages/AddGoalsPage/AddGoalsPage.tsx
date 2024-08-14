import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const AddGoalsPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [formData, setFormData] = useState({
        goal: "",
        description: "",
        time: "",
    });
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [pickerHeight] = useState(new Animated.Value(0)); // Animated value to control the height of the picker

    const handleAddGoal = async () => {
        // Logic to handle adding a goal
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
                    className='bg-white p-4 rounded-lg shadow-sm'
                    placeholder='Goal Name'
                    value={formData.goal}
                    onChangeText={(value) => setFormData({ ...formData, goal: value })}
                    keyboardType='default'
                    autoCapitalize='none'
                />
            </View>

            <View className='mb-4'>
                <Text className='text-lg mb-2'>Goal Description</Text>
                <TextInput
                    className='bg-white p-4 rounded-lg shadow-sm h-32'
                    placeholder='Goal Description'
                    value={formData.description}
                    onChangeText={(value) => setFormData({ ...formData, description: value })}
                    keyboardType='default'
                    autoCapitalize='none'
                    multiline={true}
                />
            </View>

            <View className='mb-4'>
                <Text className='text-lg mb-2'>Time To Complete Goal (Days)</Text>
                <TouchableOpacity
                    className='bg-white p-4 rounded-lg shadow-sm'
                    onPress={openPicker}
                >
                    <Text className='text-lg'>
                        {formData.time ? `${formData.time} Days` : 'Select Time'}
                    </Text>
                </TouchableOpacity>
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
                        <Picker.Item label='7 Days' value='7' />
                        <Picker.Item label='14 Days' value='14' />
                        <Picker.Item label='30 Days' value='30' />
                    </Picker>
                </Animated.View>
            )}
        </View>
    );
};

export default AddGoalsPage;
