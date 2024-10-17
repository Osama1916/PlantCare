import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {addToCart} from '../../redux/reducer/AddToCartReducer';

import {
  addFavorite,
  removeFavorite,
} from '../../redux/reducer/FavouriteReducer';

const PlantDetails = ({route, navigation}) => {
  const {plant} = route.params;
  const dispatch = useDispatch();

  // const cart = useSelector((state: RootState) => state.cart.cart);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  // const [isHeartActive, setIsHeartActive] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [review, setReview] = useState(Number(plant.review));
  const [isStarActive, setIsStarActive] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // const isFocused = useIsFocused();
  const isFavorite = favorites.some(fav => fav.id === plant.id);
  // useEffect(() => {
  //   const isFavorite = favorites.some(fav => fav.id === plant.id);
  //   setIsHeartActive(isFavorite);
  // }, [favorites, plant.id]);

  // useEffect(() => {
  //   const checkIfInCart = async () => {
  //     try {
  //       const storedCart = await AsyncStorage.getItem('CartList');
  //       const cart = storedCart ? JSON.parse(storedCart) : [];
  //       const itemInCart = cart.some(cartItem => cartItem.id === plant.id);
  //       setIsInCart(itemInCart);
  //     } catch (error) {
  //       console.error('Failed to check cart status', error);
  //     }
  //   };

  //   if (isFocused) {
  //     checkIfInCart();
  //   }
  // }, [isFocused, plant.id]);

  const toggleFavorite = () => {
    if (favorites.find(fav => fav.id === plant.id)) {
      dispatch(removeFavorite(plant.id));
    } else {
      dispatch(addFavorite(plant));
    }
    // setIsHeartActive(!isHeartActive);
  };

  const handleIconPress = () => {
    setIsStarActive(!isStarActive);
    setReview(prevReview => (isStarActive ? prevReview - 1 : prevReview + 1));
  };

  const ratingIcon = isStarActive
    ? require('../../assests/updatedstar.png')
    : require('../../assests/star.png');

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const descriptionText = isReadMore
    ? plant.Description
    : `${plant.Description.substring(0, 250)}...`;

  // const handleAddToCart = async () => {
  //   try {
  //     const storedCart = await AsyncStorage.getItem('CartList');
  //     const cart = storedCart ? JSON.parse(storedCart) : [];

  //     const itemIndex = cart.findIndex(cartItem => cartItem.id === plant.id);
  //     if (itemIndex === -1) {
  //       cart.push({...plant, quantity: 1});
  //       setIsInCart(true);
  //     } else {
  //       setIsInCart(true);
  //     }

  //     await AsyncStorage.setItem('CartList', JSON.stringify(cart));

  //     if (isInCart) {
  //       navigation.navigate('AddToCart');
  //     }
  //   } catch (error) {
  //     console.error('Failed to add item to cart', error);
  //   }
  // };

  const handleAddToCart = () => {
    dispatch(addToCart(plant));
    setIsInCart(true);
    navigation.navigate('AddToCart');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.icon}
              source={require('../../assests/previous.png')}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Details</Text>
          <TouchableOpacity
            onPress={toggleFavorite}
            style={[styles.heartIcon, isFavorite && styles.heartIconActive]}>
            <Image
              style={styles.icon1}
              source={require('../../assests/love.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={plant.image} />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>{plant.name}</Text>
          <View style={styles.ratingContainer}>
            <TouchableOpacity onPress={handleIconPress}>
              <Image style={styles.ratingIcon} source={ratingIcon} />
            </TouchableOpacity>
            <Text style={styles.infoSubtitle}>
              {plant.rating} ({review} Reviews)
            </Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.description}>{descriptionText}</Text>
          <TouchableOpacity onPress={toggleReadMore}>
            <Text style={styles.readMore}>
              {isReadMore ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.specsContainer}>
          <View>
            <Text style={styles.specsLabel}>Size</Text>
            <Text style={styles.specsValue}>{plant.Size}</Text>
          </View>
          <View>
            <Text style={styles.specsLabel}>Plant</Text>
            <Text style={styles.specsValue}>{plant.category}</Text>
          </View>
          <View>
            <Text style={styles.specsLabel}>Height</Text>
            <Text style={styles.specsValue}>{plant.Height}</Text>
          </View>
          <View>
            <Text style={styles.specsLabel}>Humidity</Text>
            <Text style={styles.specsValue}>{plant.Humidnity}</Text>
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{plant.price}</Text>
        </View>
        <TouchableOpacity onPress={handleAddToCart} style={styles.smallButton}>
          <Text style={styles.buttonText1}>
            {isInCart ? 'View Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon1: {
    width: 28,
    height: 28,
    tintColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 250,
    height: 330,
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
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    color: 'black',
  },
  infoSubtitle: {
    fontSize: 15,
    color: 'black',
    paddingTop: 7,
  },
  descriptionSection: {
    paddingTop: 10,
  },
  description: {
    fontSize: 15,
    color: 'black',
  },
  readMore: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  specsContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  specsLabel: {
    fontSize: 16,
    color: 'black',
  },
  specsValue: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  smallButton: {
    borderRadius: 37,
    height: 50,
    width: 160,
    justifyContent: 'center',
    backgroundColor: '#9DC183',
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 12,
  },
  priceLabel: {
    color: 'gray',
    fontSize: 17,
  },
  price: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PlantDetails;
