import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import MovieScreen from './screens/MovieScreen';
import { styles } from './theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const backgroundColor = styles.container.backgroundColor; // Get the background color from the theme

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <View style={{ flex: 1, backgroundColor }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor, // Set the same background color here
            },
            headerTintColor: '#fff', // Set your desired text color here
            headerTitleStyle: {
              fontWeight: 'bold', // Customize the title style if needed
            },
          }}
        >
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
