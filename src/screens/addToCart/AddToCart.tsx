import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../../redux/store/store';
import {
  removeFromCart,
  selectTotalPrice,
  updateQuantity,
  selectCartItems,
} from '../../redux/reducer/AddToCartReducer';
import {theme} from '../../utils/Themes';

const AddToCart = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const handleDeletePress = itemId => {
    Alert.alert(
      'Remove from Cart',
      'Are you sure you want to remove this item from your cart?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => dispatch(removeFromCart(itemId))},
      ],
    );
  };

  const increaseQuantity = itemId => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      dispatch(updateQuantity({id: itemId, quantity: item.quantity + 1}));
    }
  };

  const decreaseQuantity = itemId => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      dispatch(
        updateQuantity({id: itemId, quantity: Math.max(item.quantity - 1, 0)}),
      );
    }
  };

  const renderCartItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
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

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decreaseQuantity(item.id)}>
          <Image
            style={styles.add}
            source={require('../../assests/minus.png')}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity || 0}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => increaseQuantity(item.id)}>
          <Image
            style={styles.add}
            source={require('../../assests/plus.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Your cart is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <View style={styles.footerContainer}>
        <Text style={styles.totalPrice}>
          Total Price:{'\n'}${totalPrice}
        </Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  headerContainer: {
    paddingVertical: 8,
  },
  add: {
    width: 15,
    height: 15,
    tintColor: 'white',
  },
  quantityButton: {
    borderRadius: 20,
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
  },
  header: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
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
  imageContainer: {
    flex: 0.3,
    height: 100,
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
    fontFamily: 'Nunito-SemiBold',
  },
  name: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 40,
    width: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  quantityText: {
    color: theme.primary,
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: 'Nunito-ExtraBold',
  },
  footerContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutButton: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
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
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default AddToCart;
