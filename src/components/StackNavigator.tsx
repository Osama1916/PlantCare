import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login/Login';
import SignUp from '../screens/signUp/SignUp';
import Home from '../screens/home/Home';
import Splash from '../screens/splash/Splash';
import Profile from '../screens/profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favourites from '../screens/favourites.tsx/Favourites';
import PlantDetails from '../screens/plantDetails/PlantDetails';
import {Image} from 'react-native';
import AddToCart from '../screens/addToCart/AddToCart';
import Logout from '../screens/logout/Logout';
import EditProfile from '../screens/editProfile/EditProfile';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{
          //   tabBarActiveBackgroundColor: 'red',

          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={require('../assests/selectedhome.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#9DC183',
                }}
              />
            ) : (
              <Image
                source={require('../assests/home.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'black',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarIcon: ({focused}) => {
            return !focused ? (
              <Image
                source={require('../assests/love.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'black',
                }}
              />
            ) : (
              <Image
                source={require('../assests/selectedheart.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#9DC183',
                }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="AddToCart"
        component={AddToCart}
        options={{
          tabBarIcon: ({focused}) => {
            return !focused ? (
              <Image
                source={require('../assests/shopping-cart.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'black',
                }}
              />
            ) : (
              <Image
                source={require('../assests/updatedshopping-cart).png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#9DC183',
                }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={require('../assests/user.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#9DC183' : 'black',
                }}
              />
            ) : (
              <Image
                source={require('../assests/selecteduser.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#9DC183' : 'black',
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        component={Home}
        name="Home"
        options={{headerShown: false}}
      />

      <Stack.Screen
        component={PlantDetails}
        name="PlantDetails"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tabs"
        // component={TopTabs}
        component={BottomTabs}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Favourites"
        component={Favourites}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="PlantDetails"
        component={PlantDetails}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        component={AddToCart}
        name="AddToCart"
        options={{headerShown: false}}
      />

      <Stack.Screen
        component={Logout}
        name="Logout"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={EditProfile}
        name="EditProfile"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
