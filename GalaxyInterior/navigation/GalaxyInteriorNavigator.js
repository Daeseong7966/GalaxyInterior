import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import QAScreen from '../screens/Q&AScreen';

const Stack = createStackNavigator();

class GalaxyInteriorNavigator extends React.Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name = "Home" component = {HomeScreen} options = {{headerShown : false}} />
                    <Stack.Screen name = "Info" component = {InfoScreen} options = {{headerShown : false}} />
                    <Stack.Screen name = "Q&A" component = {QAScreen} options = {{headerShown : false}} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default GalaxyInteriorNavigator;