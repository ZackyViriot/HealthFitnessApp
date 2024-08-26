import React,{useState,useEffect} from "react";
import { SafeAreaView, View } from 'react-native';
import { Calendar,Agenda } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvalidTokenError, jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';



const CalendarPage = () => {
    //state for selected day 
    const [selected,setSelected] = useState('')
    //got to get the events from the mongo db database 
    const [events,setEvents] = useState<any[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading,setLoading] = useState(true)
;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken')
                if(!token){
                    navigation.navigate('LoginPage')
                    return;
                }
                const decoded: any = jwtDecode(token);
                const userId = decoded.id;

                const res = await axios.get(`http://localhost:3000/events/getUserEvents?userId=${userId}`,{
                    headers: {
                        Authorization: `Bearer ${InvalidTokenError}`
                    },
                });
                setEvents(res.data);
            }catch(error){
                console.error("Failed to fetch goals:",error);
            }finally{
                setLoading(false);
            }
        }

        fetchUserInfo();
    },[navigation])




    return (
        <SafeAreaView className="flex-1">
            {/* <Agenda
                items={events}
            /> */}
        </SafeAreaView>
    );
}

export default CalendarPage;
