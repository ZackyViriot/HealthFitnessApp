import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Goal {
    _id: string;
    goalTitle: string;
    description: string;
    time: string;
}

interface GoalCardForGoalDashboard {
    goal: Goal;
}


const GoalsDashboardCard: React.FC<GoalCardForGoalDashboard> = ({ goal }) => {
    const [goalToDelete,setGoalToDelete] = useState<string |null>(null);

    const handleDelete = () => {
        
    }


    return (
        <View className="bg-white rounded-2xl m-5 p-4 shadow-lg">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xl font-bold text-gray-900">{goal.goalTitle}</Text>
                <TouchableOpacity className="p-2 bg-red-100 rounded-full">
                    <Ionicons name="trash-outline" onPress={handleDelete} size={20} color="red" />
                </TouchableOpacity>
            </View>
            <Text className="text-gray-700 mb-3">{goal.description}</Text>
            <View className="flex-row justify-between items-center">
                <Text className="text-sm text-gray-500">{goal.time} Days</Text>
                <TouchableOpacity className="p-2 bg-blue-100 rounded-full">
                    <Ionicons name="pencil-outline" size={20} color="blue" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GoalsDashboardCard;
