import React,{useState} from "react";
import { SafeAreaView, View } from 'react-native';
import { Calendar,Agenda } from 'react-native-calendars';

const CalendarPage = () => {
    //state for selected day 
    const [selected,setSelected] = useState('')

    return (
        <SafeAreaView className="flex-1">
            <Agenda/>
        </SafeAreaView>
    );
}

export default CalendarPage;
