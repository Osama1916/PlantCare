import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Buttons from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const SignUp = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const [profilePicUri, setProfilePicUri] = useState('');

  const MAX_NAME_LENGTH = 30;
  const MAX_PASSWORD_LENGTH = 20;
  const PHONE_NUMBER_LENGTH = 11;

  const isEmailValid = email => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = password => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,21}$/;
    return passwordRegex.test(password);
  };

  const isPhoneNumberValid = phoneNumber => {
    return (
      phoneNumber.length === PHONE_NUMBER_LENGTH && /^\d+$/.test(phoneNumber)
    );
  };
  const handleSignUp = async () => {
    if (!isEmailValid(email)) {
      Alert.alert('Invalid email format');
      return;
    }
    if (!isPasswordValid(password)) {
      Alert.alert('Invalid password format');
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    if (
      fullName.length > MAX_NAME_LENGTH ||
      username.length > MAX_NAME_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      Alert.alert('Name or Password exceeds their limits');
      return;
    }
    if (!isPhoneNumberValid(phoneNumber)) {
      Alert.alert('Phone number must be 11 digits');
      return;
    }

    try {
      const users = await AsyncStorage.getItem('users');
      const parsedUsers = users ? JSON.parse(users) : [];
      const userExists = parsedUsers.some(user => user.email === email);
      if (userExists) {
        Alert.alert('User already exists');
        return;
      }
      const newUser = {
        fullName,
        username,
        email,
        phoneNumber,
        password,
        profilePicUri,
      };
      parsedUsers.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
      console.log('User signed up:', newUser);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible);
  };

  const isFormValid = () => {
    return (
      fullName &&
      username &&
      email &&
      phoneNumber &&
      password &&
      repeatPassword &&
      isEmailValid(email) &&
      isPasswordValid(password) &&
      password === repeatPassword &&
      isPhoneNumberValid(phoneNumber)
    );
  };

  const openImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets[0]) {
        setProfilePicUri(response.assets[0].uri);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <ImageBackground
            style={styles.background}
            source={require('../../assests/home1.jpg')}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.icon2}
                source={require('../../assests/previous.png')}
              />
            </TouchableOpacity>
            <Text style={styles.loginText}>Create your {'\n account'}</Text>
            <Text style={styles.loginText1}>Join us you</Text>
            <Text style={styles.loginText1}>plant fanatic!</Text>
          </ImageBackground>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profilePicContainer}>
            <View style={styles.profilePic}>
              <Image
                style={styles.profilePicImage}
                source={
                  profilePicUri
                    ? {uri: profilePicUri}
                    : require('../../assests/black-circle.png')
                }
              />
              <TouchableOpacity
                style={styles.uploadIcon}
                onPress={openImagePicker}>
                <Image
                  style={styles.uploadIconImage}
                  source={require('../../assests/image.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={styles.placeholder.color}
            value={fullName}
            onChangeText={setFullName}
            underlineColorAndroid={styles.underlineColor.color}
          />
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={styles.placeholder.color}
            value={username}
            onChangeText={setUsername}
            underlineColorAndroid={styles.underlineColor.color}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={styles.placeholder.color}
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
            underlineColorAndroid={styles.underlineColor.color}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={styles.placeholder.color}
            value={phoneNumber}
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
            maxLength={PHONE_NUMBER_LENGTH}
            underlineColorAndroid={styles.underlineColor.color}
          />
          <View style={styles.passwordWrapper}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={styles.placeholder.color}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              underlineColorAndroid={styles.underlineColor.color}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}>
              <Image
                style={styles.icon1}
                source={require('../../assests/visibility.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordWrapper}>
            <Text style={styles.label}>Repeat password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Repeat password"
              placeholderTextColor={styles.placeholder.color}
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry={!isRepeatPasswordVisible}
              underlineColorAndroid={styles.underlineColor.color}
            />
            <TouchableOpacity
              onPress={toggleRepeatPasswordVisibility}
              style={styles.iconContainer}>
              <Image
                style={styles.icon1}
                source={require('../../assests/visibility.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.loginButtonWrapper}>
            <Buttons
              title="Sign Up"
              onPress={handleSignUp}
              backgroundColor="orange"
              disabled={!isFormValid()}
            />
          </View>
          <Text style={styles.orText}>Or use</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assests/fb.png')}
              />
              <Text style={styles.icontext}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assests/google.png')}
              />
              <Text style={styles.icontext}>Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupWrapper}>
            <Text style={styles.signupText}>
              Already have an account?{' '}
              <Text
                onPress={() => navigation.navigate('Login')}
                style={styles.signupLink}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    height: 230,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  loginText: {
    fontSize: 30,
    padding: 10,
    fontFamily: 'Nunito-ExtraBold',
    color: 'white',
  },
  loginText1: {
    fontSize: 22,
    color: 'white',
    paddingLeft: 15,
    fontFamily: 'Nunito-SemiBold',
  },
  formWrapper: {
    paddingHorizontal: 15,
  },
  label: {
    color: 'gray',
    fontSize: 15,
    paddingTop: 15,
    paddingLeft: 3,
    fontFamily: 'Nunito-Bold',
  },
  inputWrapper: {
    position: 'relative',
    paddingTop: 5,
  },
  input: {
    color: 'black',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  icon2: {
    height: 25,
    width: 25,
    tintColor: 'white',
  },
  icon1: {
    width: 30,
    height: 30,
  },
  loginButtonWrapper: {
    paddingTop: 15,
  },
  passwordWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotText: {
    color: 'gray',
    fontSize: 16,
    paddingTop: 15,
    fontFamily: 'Nunito-ExtraBold',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Nunito-Regular',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
  },
  iconWrapper: {
    backgroundColor: 'purple',
    flex: 0.48,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  icontext: {
    paddingHorizontal: 10,
  },
  signupWrapper: {
    paddingTop: 13,
  },
  signupText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
  signupLink: {
    color: 'gray',
    fontSize: 18,
  },
  placeholder: {
    color: 'lightgray',
  },
  underlineColor: {
    color: 'lightgray',
  },

  profilePicContainer: {
    paddingBottom: 10,
  },

  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },

  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'gray',
    // position: 'relative',
    // overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
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
});

export default SignUp;
