import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/components/StackNavigator';
import {Provider} from 'react-redux';
// import {store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
