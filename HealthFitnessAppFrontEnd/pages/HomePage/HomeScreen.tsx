import React, {useState,useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation,NavigationProp} from '@react-navigation/native';
import { RootStackParamList } from '../../types';
//going to import async sotarge in order to get token for user 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';



interface User {
  email:string;
  username:string;
}


const HomeScreen: React.FC = () => {
  // const navigation = useNavigation();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  //going to need a state for the user infromation 
  const [user,setUser] = useState<User | null>(null);
  //need to make a state for if there is a token or not if there isnt a token we will display the login page 

  

  // this is going to be rough but we are going to try to display the user infromation from the token stored inside the AsyncStorage 
  // if the user is not logged in we will display the login page

  //function to get the token from the async storage when the page renders 
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if(!token) {
          throw new Error("No Token Found");
        }

        const decoded: any = jwtDecode(token);
        //get the user id 
        const userId = decoded.id;
        console.log(userId)


        const res = await axios.get(`http://localhost:3000/user/${userId}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })

        setUser(res.data);
      }catch(error){
        console.error('Failed to fetch user information:',error)
      }
    }

    fetchUserInfo();
  },[])
 

  
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>{user?.email}</Text>
      <Text className='font-bold text-2xl'>{user?.username}</Text>
      <Button
        title="Go To SignUpPage"
        onPress={() => navigation.navigate('SignUpPage')} // Corrected route name
      />
    </View>
  );
};

export default HomeScreen;
