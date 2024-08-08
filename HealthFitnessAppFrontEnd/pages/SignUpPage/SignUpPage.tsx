import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SignUpPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        setPasswordMatch(true);
    }

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/user/signup", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.token;
    
            if (token) {
                await AsyncStorage.setItem('userToken', token);
                navigation.navigate('Home');
            } else {
                console.error("No token received");
            }
        } catch (error) {
            console.error("Error during signup: ", error);
        }
    }
    
    return (
        <View className="flex-1 p-10 bg-gray-100 justify-center">
            <Text className="font-bold text-2xl text-center mb-8">Join Our Community</Text>

            <View className="mb-4">
                <Text className="text-lg mb-2">Email</Text>
                <TextInput
                    className="bg-white p-4 rounded-lg shadow-sm"
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            
            <View className="mb-4">
                <Text className="text-lg mb-2">UserName</Text>
                <TextInput
                    className="bg-white p-4 rounded-lg shadow-sm"
                    placeholder="Username"
                    value={formData.username}
                    onChangeText={(value) => handleInputChange('username', value)}
                />
            </View>

            <View className="mb-4">
                <Text className="text-lg mb-2">Password</Text>
                <TextInput
                    className="bg-white p-4 rounded-lg shadow-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>

            <View className="mb-6">
                <Text className="text-lg mb-2">Confirm Password</Text>
                <TextInput
                    className="bg-white p-4 rounded-lg shadow-sm"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity 
                className="bg-black p-2 rounded-lg mb-4"
                onPress={handleSubmit}
            >
                <Text className="text-white text-center text-lg">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                className="p-4"
                onPress={() => navigation.navigate('LoginPage')}
            >
                <Text className="text-black text-center text-lg">Already have an account? Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignUpPage;
