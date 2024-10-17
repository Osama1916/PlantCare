import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const Button: React.FC<any> = ({title, onPress, backgroundColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonWrapper, {backgroundColor}]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Nunito-Bold',
  },
});

export default Button;
