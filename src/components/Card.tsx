import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const deviceWidth = Dimensions.get('screen').width;

const Card: React.FC<any> = ({
  title,
  price,
  imageSource,
  onPress,
  onButtonPress,
  favouriteIcon,
  onFavouriteToggle,
  isFavourite,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.buttonRotate}>{title}</Text>
      </View>
      <Text style={styles.buttonText}>{price}</Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={onButtonPress} style={styles.smallButton}>
          <Text style={styles.buttonText1}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onFavouriteToggle}
          style={[styles.heartIcon, isFavourite && styles.heartIconActive]}>
          <Image style={styles.heartImage} source={favouriteIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginEnd: 15,
    borderRadius: 28,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 15,
    height: 300,
    width: deviceWidth / 1.85,
    backgroundColor: 'lightgray',
    zIndex: -1,
  },
  imageContainer: {
    height: 210,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    height: '100%',
    width: 150,
    resizeMode: 'contain',
  },
  titleContainer: {
    position: 'absolute',
    top: 120,
    right: 55,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '270deg'}],
    width: 230,
  },
  buttonRotate: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: 'black',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: 'black',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  actionContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
  },
  smallButton: {
    borderRadius: 27,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    width: 118,
  },
  buttonText1: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  heartIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 42,
    borderWidth: 1,
    height: 43,
    width: 43,
  },
  heartIconActive: {
    backgroundColor: 'black',
    borderRadius: 42,
    height: 43,
    borderWidth: 1,
    width: 43,
  },
  heartImage: {
    width: 22,
    height: 22,
    tintColor: 'white',
  },
});

export default Card;
