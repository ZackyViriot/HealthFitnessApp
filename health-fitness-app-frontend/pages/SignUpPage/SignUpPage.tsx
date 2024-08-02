import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const SignUpPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        // Add sign-up logic here
    };

    return (
        <View className="flex-1 p-6 bg-gray-100 justify-center">
            <Text className="font-bold text-2xl text-center mb-8">Join Our Community</Text>
            
            <View className="mb-4">
                <Text className="text-lg mb-2">Email</Text>
                <TextInput
                    className="bg-white p-4 rounded-lg shadow-sm"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            
            <View className="mb-4">
                <Text className="text-lg mb-2">Password</Text>
                <TextInput
                    className="bg-white p-4 rounded-lg shadow-sm"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            
            <View className="mb-6">
                <Text className="text-lg mb-2">Confirm Password</Text>
                <TextInput
                    className="bg-white p-4 rounded-lg shadow-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            
            <TouchableOpacity 
                className="bg-blue-500 p-2 rounded-lg mb-4"
                onPress={handleSignUp}
            >
                <Text className="text-white text-center text-lg">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                className="p-4"
                onPress={() => navigation.navigate('LoginPage')}
            >
                <Text className="text-blue-500 text-center text-lg">Already have an account? Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignUpPage;
