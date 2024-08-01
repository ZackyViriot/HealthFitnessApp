import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation,NavigationProp} from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const HomeScreen = () => {
  // const navigation = useNavigation();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  
  return (
    <View>
      <Text>This will be the home page where you will either login or sign up have to figure out how to store that info</Text>
      <Button
        title="Go to Calendar"
        onPress={() => navigation.navigate('Calendar')} // Corrected route name
      />
    </View>
  );
};

export default HomeScreen;
