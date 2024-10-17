import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsFocused} from '@react-navigation/native'; // Import useIsFocused

import {RootState} from '../../redux/store/store';
import {useSelector, useDispatch} from 'react-redux';
import {removeFavorite} from '../../redux/reducer/FavouriteReducer';
import {addToCart} from '../../redux/reducer/AddToCartReducer';

const Favourites = ({navigation}) => {
  const data = useSelector((state: RootState) => state.favorites.favorites);

  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  // const checkInCart = item => {
  //   // if (cartItems?.length === 0) return true;

  //   const l = cartItems?.find(cartItem => cartItem.id === item.id);

  //   console.log('====================================');
  //   console.log(';;;', !l);
  //   console.log('====================================');
  //   return l;
  // };
  // const handleAddToCart = item => {
  //   const isAddedInCart = checkInCart(item);
  //   console.log('Item being added to cart:', !isAddedInCart);

  //   if (!isAddedInCart) {
  //     dispatch(addToCart(item));
  //     navigation.navigate('AddToCart');
  //   } else {
  //     Alert.alert('Alr', 'Already added');
  //   }
  // };

  const handleAddToCart = item => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (!existingItem) {
      dispatch(addToCart(item));
      navigation.navigate('AddToCart');
      // Alert.alert('Added to Cart', 'This item has been added to your cart.');
    } else {
      Alert.alert('Item Already in Cart', 'This item is already in your cart.');
    }
    // console.log(',,,,,', item);
  };

  // useEffect(() => {
  //   if (isFocused) {
  //     const loadFavorites = async () => {
  //       try {
  //         const storedFavorites = await AsyncStorage.getItem('favouriteList');
  //         if (storedFavorites) {
  //           setFavouriteItems(JSON.parse(storedFavorites));
  //         }
  //       } catch (error) {
  //         console.error('Failed to load favorites from AsyncStorage', error);
  //       }
  //     };

  //     loadFavorites();
  //   }
  // }, [isFocused]); // Reload favorites when the screen is focused
  // const removeFromFavorites = async itemId => {
  //   try {
  //     const updatedFavorites = favouriteItems.filter(
  //       item => item.id !== itemId,
  //     );
  //     setFavouriteItems(updatedFavorites);
  //     // await AsyncStorage.setItem(
  //     //   'favouriteList',
  //     //   JSON.stringify(updatedFavorites),
  //     // );
  //   } catch (error) {
  //     console.error('Failed to remove item from favorites', error);
  //   }
  // };

  const handleDeletePress = itemId => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this item from your favorites?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => dispatch(removeFavorite(itemId))},
      ],
    );
  };

  // const handleAddToCart = async item => {
  //   try {
  //     const storedCart = await AsyncStorage.getItem('CartList');
  //     const cart = storedCart ? JSON.parse(storedCart) : [];

  //     const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

  //     if (itemIndex === -1) {
  //       cart.push({...item, quantity: 1});
  //       await AsyncStorage.setItem('CartList', JSON.stringify(cart));
  //       navigation.navigate('AddToCart');
  //     } else {
  //       Alert.alert(
  //         'Item Already in Cart',
  //         'This item is already in your cart.',
  //         [{text: 'OK'}],
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Failed to add item to cart', error);
  //   }
  // };
  const renderFavoriteItem = ({item}) => (
    <View style={styles.card}>
      <View style={{flex: 0.3, height: 100}}>
        <Image style={styles.image} source={item.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>{item.price}</Text>
        <Text style={styles.text}>{item.Size}</Text>
        <Text style={styles.text}>{item.category}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => handleDeletePress(item.id)}>
        <Image
          style={styles.icon}
          source={require('../../assests/delete.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallButton}
        onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText1}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Favourites</Text>
      </View>

      {data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            Your favorites list is empty.jfjhfjhjh
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item?.id?.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    paddingVertical: 8,
  },
  header: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    // fontWeight: '700',
    fontFamily: 'Nunito-ExtraBold',
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: '#9DC183',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    resizeMode: 'contain',
    height: '100%',
    width: 80,
  },
  textContainer: {
    flex: 0.6,
  },
  text: {
    color: '#FFFEFA',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 3,
    // fontWeight: '500',
    fontFamily: 'Nunito-SemiBold',
  },
  name: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    // fontWeight: '700',
    fontFamily: 'Nunito-ExtraBold',
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'red',
  },
  smallButton: {
    position: 'absolute',
    borderRadius: 27,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45,
    width: 118,
    bottom: 10,
    right: 10,
  },
  buttonText1: {
    color: 'black',
    fontSize: 13,
    // fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: 'black',
  },
});

export default Favourites;
