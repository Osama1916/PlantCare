import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const Categorie: React.FC<any> = ({title, onPress, selectedItem}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonWrapper, {borderColor: selectedItem}]}>
        <Text style={[styles.buttonText, {color: selectedItem}]}>{title} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    height: 45,
    marginEnd: 10,
  },
  buttonText: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
  },
});

export default Categorie;
