// LogoutScreen.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../utils/Themes';

const LogoutScreen = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      navigation.navigate('Login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error logging out', error);
      Alert.alert(
        'Error',
        'An error occurred while logging out. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Are you sure you want to log out?</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  logoutButton: {
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    fontSize: 18,
    color: theme.primary,
  },
});

export default LogoutScreen;
