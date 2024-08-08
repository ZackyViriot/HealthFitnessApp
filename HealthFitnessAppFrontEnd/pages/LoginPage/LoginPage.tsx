import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import axois from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            const res = await axois.post('http://localhost:3000/user/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = res.data.token;

            if (token) {
                await AsyncStorage.setItem('userToken', token);
                navigation.navigate('Home');
            } else {
                setError("No token received. Please check your credentials.");
            }
        } catch (error) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <View className="flex-1 p-6 bg-gray-100 justify-center">
            <Text className="font-bold text-2xl text-center mb-8">Welcome Back</Text>

            {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}

            <View className="mb-4">
                <Text className="text-lg mb-2">Email</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${error ? 'border border-red-500' : ''}`}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View className="mb-4">
                <Text className="text-lg mb-2">Password</Text>
                <TextInput
                    className={`bg-white p-4 rounded-lg shadow-sm ${error ? 'border border-red-500' : ''}`}
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                className="bg-black p-2 rounded-lg mb-4"
                onPress={handleLogin}
            >
                <Text className="text-white text-center text-lg">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="p-4"
                onPress={() => navigation.navigate("SignUpPage")}
            >
                <Text className="text-black text-center text-lg">Don't have an account? Sign up here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginPage;
