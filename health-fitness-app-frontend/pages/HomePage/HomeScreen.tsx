import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation,NavigationProp} from '@react-navigation/native';
import { RootStackParamList } from '../../types';


const HomeScreen = () => {
  // const navigation = useNavigation();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  
  return (
    <View className='flex-1 justify-center items-center'>
      <Text > This will be the home page where you will either login or sign up have to figure out how to store that info</Text>
      <Button
        title="Go To SignUpPage"
        onPress={() => navigation.navigate('SignUpPage')} // Corrected route name
      />
    </View>
  );
};

export default HomeScreen;
