import React , {useState} from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation,NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";


const LoginPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleLogin = () => {
        // Add login logic here
        //going to add the logic later for now just going to have the funciton
    }

    return (
        <View className="flex-1 p-6 bg-gray-100 justify-center">
            <Text className="font-bold text-2xl text-center mb-8">Welcome Back</Text>

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
                    className="bg-white  p-4 rounded-lg shadow-sm"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
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
                <Text className="text-black text-center text-lg">Dont have an account sign up here</Text>
            </TouchableOpacity>
        </View>
    )


}


export default LoginPage;