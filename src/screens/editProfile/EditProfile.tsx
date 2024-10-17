import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import {theme} from '../../utils/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = ({navigation}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [profilePicUri, setProfilePicUri] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        if (userData) {
          let user = JSON.parse(userData);
          setName(user?.fullName);
          setUserName(user?.username);
          setEmail(user?.email);
          setNumber(user?.phoneNumber);
          setProfilePicUri(user?.profilePicUri);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const updatedUser = {
        fullName: name,
        username: userName,
        email: email,
        phoneNumber: number,
        profilePicUri: profilePicUri,
      };
      console.log('Saving user data:', updatedUser);

      // Update loggedInUser
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      // Update users
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        let users = JSON.parse(usersData);
        const index = users.findIndex(user => user.username === userName);
        if (index !== -1) {
          users[index] = updatedUser;
          await AsyncStorage.setItem('users', JSON.stringify(users));
        }
      }

      Alert.alert(
        'Profile Updated',
        'Your profile information has been updated.',
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving your profile.');
    }
  };

  const openImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets[0]) {
        const newUri = response.assets[0].uri;
        console.log('Selected image URI:', newUri); // Log the URI to confirm
        setProfilePicUri(newUri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../../assests/previous.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon1}
            source={require('../../assests/menu.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profilePic}>
          <Image
            style={styles.profileImage}
            source={
              profilePicUri
                ? {uri: profilePicUri}
                : require('../../assests/black-circle.png')
            }
          />

          <TouchableOpacity style={styles.uploadIcon} onPress={openImagePicker}>
            <Image
              style={styles.uploadIconImage}
              source={require('../../assests/image.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={name}
          // placeholderTextColor={styles.placeholder.color}
          keyboardType="default"
          onChangeText={text => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          // placeholder={username}
          // placeholderTextColor={styles.placeholder.color}
          keyboardType="default"
          onChangeText={text => setUserName(text)}
          value={userName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          // placeholder={email}
          value={email}
          // placeholderTextColor={styles.placeholder.color}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          // placeholder={phoneNumber}
          // placeholderTextColor={styles.placeholder.color}
          keyboardType="phone-pad"
          onChangeText={Number => setNumber(Number)}
          value={number}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSave}>
        <Text style={styles.logoutButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  icon1: {
    width: 26,
    height: 26,
    tintColor: 'black',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  profilePicContainer: {
    paddingBottom: 10,
  },
  profilePic: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },
  profilePicImage: {
    width: 90,
    height: 90,
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 28,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 5,
  },
  uploadIconImage: {
    width: 16,
    height: 16,
  },
  inputContainer: {
    paddingTop: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
  placeholder: {
    color: 'lightgray',
  },
  input: {
    color: 'black',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'lightgray',
    paddingLeft: 15,
    paddingVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: theme.primary,
    borderRadius: 30,
    paddingVertical: 10,
    // paddingHorizontal: 15,
    // alignSelf: 'flex-end',
    // marginRight: 15,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfile;
