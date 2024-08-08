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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the changed field
    };

    const handleSubmit = async () => {
        let hasError = false;
        const newErrors: { [key: string]: string } = {};

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            hasError = true;
        }

        if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
            if (!formData.email) newErrors.email = "Email is required";
            if (!formData.username) newErrors.username = "Username is required";
            if (!formData.password) newErrors.password = "Password is required";
            if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
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
    };

    return (
        <View className="flex-1 p-10 bg-gray-100 justify-center">
            <Text className="font-bold text-2xl text-center mb-8">Join Our Community</Text>

            <View className="mb-4">
                <Text className="text-lg mb-2">Email</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.email ? 'border border-red-500' : ''}`}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-lg mb-2">Username</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.username ? 'border border-red-500' : ''}`}
                    placeholder="Username"
                    value={formData.username}
                    onChangeText={(value) => handleInputChange('username', value)}
                />
                {errors.username && <Text className="text-red-500 mt-1">{errors.username}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-lg mb-2">Password</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.password ? 'border border-red-500' : ''}`}
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                {errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}
            </View>

            <View className="mb-6">
                <Text className="text-lg mb-2">Confirm Password</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                {errors.confirmPassword && <Text className="text-red-500 mt-1">{errors.confirmPassword}</Text>}
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
