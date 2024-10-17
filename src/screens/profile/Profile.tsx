import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../utils/Themes';
import {CommonActions} from '@react-navigation/native';
// import {useFocusEffect} from '@react-navigation/native';
// import EditProfile from '../editProfile/EditProfile';

const Profile = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        if (userData) {
          const user = JSON.parse(userData);
          console.log('Retrieved user data:', user);
          setUser(user);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();

    const update = navigation.addListener('focus', fetchUserData);

    return update;
  }, [navigation]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  const {fullName, username, phoneNumber, profilePicUri} = user;

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('loggedInUser');

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                }),
              );
            } catch (error) {
              console.error('Error clearing AsyncStorage:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backscreen}
            source={require('../../assests/previous.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Image
            style={styles.icon1}
            source={require('../../assests/menu.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profilePicContainer}>
          <View style={styles.profilePic}>
            <Image
              style={styles.profileImage}
              source={
                profilePicUri
                  ? {uri: profilePicUri}
                  : require('../../assests/black-circle.png')
              }
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.nameText}>{fullName}</Text>
        <Text style={styles.usernameText}>@{username}</Text>
        <Text style={styles.usernamePhone}>{phoneNumber}</Text>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.settingsContainer}>
        <View style={styles.settingsContent}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.settingsIcon}
              source={require('../../assests/settings.png')}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation to settings */
            }}>
            <Text style={styles.settingsText}>Settings</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.icon}
          source={require('../../assests/chevron.png')}
        />
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingsContent}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.settingsIcon}
              source={require('../../assests/receipt.png')}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation to billing details */
            }}>
            <Text style={styles.settingsText}>Billing Details</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.icon}
          source={require('../../assests/chevron.png')}
        />
      </View>

      <View style={styles.separator} />

      <View style={styles.settingsContainer}>
        <View style={styles.settingsContent}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.settingsIcon}
              source={require('../../assests/insurance.png')}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              /* Handle navigation to privacy policy */
            }}>
            <Text style={styles.settingsText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.icon}
          source={require('../../assests/chevron.png')}
        />
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingsContent}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.settingsIcon}
              source={require('../../assests/power-off.png')}
            />
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.settingsText}>Log out</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.icon}
          source={require('../../assests/chevron.png')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  icon1: {
    width: 28,
    height: 28,
    tintColor: 'black',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 40,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Nunito-Bold',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,
  },
  profilePicContainer: {
    paddingBottom: 10,
  },
  profilePic: {
    borderRadius: 50,
    borderWidth: 1,
  },
  profileImage: {
    width: 90,
    height: 90,

    borderRadius: 45,
  },
  nameText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Nunito-ExtraBold',
  },
  backscreen: {
    width: 20,
    height: 20,
  },
  usernameText: {
    fontSize: 15,
    color: 'gray',
    paddingBottom: 10,
    fontFamily: 'Nunito-SemiBold',
  },
  usernamePhone: {
    fontSize: 15,
    color: 'black',
    paddingBottom: 10,
    fontFamily: 'Nunito-SemiBold',
  },
  editProfileButton: {
    backgroundColor: theme.primary,
    borderRadius: 44,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  editProfileText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
  separator: {
    backgroundColor: 'lightgray',
    height: 1,
    width: '100%',
    marginTop: 30,
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
  },
  settingsContent: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  iconWrapper: {
    borderRadius: 8,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary + 40,
  },
  settingsIcon: {
    width: 15,
    height: 15,
    tintColor: theme.primary,
  },
  settingsText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 14,
    fontFamily: 'Nunito-Bold',
  },
});

export default Profile;
