import {Stack} from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function  layout(){
    return (
        <Stack screenOptions={{HeaderShown: false}}>
            <Stack.Screen name="index"/>
        </Stack>
    );
}
