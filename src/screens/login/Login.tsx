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
import React, {useState, useEffect} from 'react';
import Buttons from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Tabs'}],
          }),
        );
      }
    };

    const loadSavedCredentials = async () => {
      try {
        const savedIdentifier = await AsyncStorage.getItem('savedIdentifier');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        if (savedIdentifier) setIdentifier(savedIdentifier);
        if (savedPassword) setPassword(savedPassword);
      } catch (error) {
        console.error('Failed to load saved credentials:', error);
      }
    };

    checkLoginStatus();
    loadSavedCredentials();
  }, [navigation]);

  const MAX_IDENTIFIER_LENGTH = 30;
  const MAX_PASSWORD_LENGTH = 20;

  // const isEmailValid = email => {
  //   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  //   return emailRegex.test(email);
  // };

  // const isPhoneNumberValid = phoneNumber => {
  //   const phoneRegex = /^\d{11}$/; // Ensures 11-digit phone number
  //   return phoneRegex.test(phoneNumber);
  // };

  const isPasswordValid = password => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,21}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    if (identifier.length > MAX_IDENTIFIER_LENGTH) {
      Alert.alert('Identifier exceeds its limit');
      return;
    }
    if (password.length > MAX_PASSWORD_LENGTH) {
      Alert.alert('Password exceeds its limit');
      return;
    }
    if (identifier.length === 0 || password.length === 0) {
      Alert.alert('Please fill in all fields');
      return;
    }
    if (!isPasswordValid(password)) {
      Alert.alert('Invalid password format');
      return;
    }

    setIsLoading(true);

    try {
      const users = await AsyncStorage.getItem('users');
      if (users) {
        const parsedUsers = JSON.parse(users);
        const user = parsedUsers.find(
          user =>
            user.username === identifier ||
            user.email === identifier ||
            user.phoneNumber === identifier,
        );
        console.log(',,,,,,', user);
        if (user) {
          await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
          await AsyncStorage.setItem('savedIdentifier', identifier); // Save identifier
          await AsyncStorage.setItem('savedPassword', password);
          console.log('User logged in:', user);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            }),
          );
        } else {
          Alert.alert('Invalid credentials');
        }
      } else {
        Alert.alert('No users found');
      }
    } catch (error) {
      console.error('Error logging in', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
            <Text style={styles.loginText}>Login to your account</Text>
            <Text style={styles.loginText1}>Welcome back you</Text>
            <Text style={styles.loginText1}>proud plant owner!</Text>
          </ImageBackground>
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Username, Email, or Phone Number"
            placeholderTextColor={styles.placeholder.color}
            value={identifier}
            onChangeText={setIdentifier}
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
          <View style={styles.loginButtonWrapper}>
            <Buttons
              title={isLoading ? 'Logging in...' : 'Login'}
              onPress={handleLogin}
              backgroundColor="orange"
              disabled={isLoading}
            />
          </View>

          <Text style={styles.orText}>Or use</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assests/fb.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assests/google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assests/scanner.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signupWrapper}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text
                onPress={() => navigation.navigate('SignUp')}
                style={styles.signupLink}>
                Sign Up
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
    fontSize: 34,
    padding: 15,
    fontFamily: 'Nunito-Bold',
    color: 'white',
    lineHeight: 34,
    marginTop: 10,
  },
  loginText1: {
    fontSize: 22,
    color: 'white',
    paddingLeft: 15,
    fontFamily: 'Nunito-SemiBold',
  },
  formWrapper: {
    padding: 15,
  },
  label: {
    color: 'gray',
    fontSize: 17,
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
  icon1: {
    width: 30,
    height: 30,
  },
  loginButtonWrapper: {
    paddingTop: 20,
  },
  passwordWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotText: {
    color: 'gray',
    fontSize: 16,
    paddingTop: 15,
    fontFamily: 'Nunito-Bold',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Nunito-Regular',
    paddingTop: 4,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  iconWrapper: {
    backgroundColor: 'purple',
    flex: 0.31,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  signupWrapper: {
    paddingTop: 13,
  },

  signupText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    fontFamily: 'Nunito-Bold',
  },
  signupLink: {
    color: 'gray',
    fontSize: 18,
    paddingTop: 10,
    borderBottomWidth: 0.5,
  },
  placeholder: {
    color: 'lightgray',
  },
  underlineColor: {
    color: 'lightgray',
  },
});

export default Login;
