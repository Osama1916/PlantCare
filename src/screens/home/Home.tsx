import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Categorie from '../../components/Categorie';
import Card from '../../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/reducer/AddToCartReducer';
import {
  addFavorite,
  removeFavorite,
} from '../../redux/reducer/FavouriteReducer';
import {RootState} from '../../redux/store/store';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsFocused} from '@react-navigation/native';

const categories = [
  {id: 1, categoryname: 'All'},
  {id: 2, categoryname: 'Indoor'},
  {id: 3, categoryname: 'Outdoor'},
  {id: 4, categoryname: 'Popular'},
];

const plants = [
  {
    id: '1',
    name: 'Sun Flower ',
    image: require('../../assests/sun_flower.png'),
    category: 'Outdoor',
    price: '$39',
    Height: '10m',
    rating: '4.7',
    review: 510,
    Size: 'Medium',
    Humidnity: '80%',
    Description:
      ' The sunflower is a vibrant, tall plant known for its large, golden-yellow blooms that follow the sun. Its cheerful appearance and bright petals make it a popular choice for gardens and floral arrangements. Native to the Americas, sunflowers are not only admired for their beauty but also valued for their seeds, which are a rich source of nutrients. Easy to grow and maintain, sunflowers add a touch of sunshine to any outdoor space.',
    favouriteIcon: require('../../assests/love.png'),
  },

  {
    id: '2',
    name: 'Potted Plant ',
    image: require('../../assests/potted_Plant.png'),
    category: 'Indoor',
    price: '$25',
    Height: '3m',
    Size: 'Small',
    Humidnity: '70%',
    rating: '4.3',
    review: 610,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'Potted plant perfect for brightening up any room. Its lush green leaves bring a touch of nature indoors, while the stylish pot complements any décor. Easy to care for, this plant thrives in various light conditions and adds a refreshing vibe to your living area. Ideal for both beginners and seasoned plant enthusiasts.',
  },

  {
    id: '3',
    name: 'Pink Flower ',
    image: require('../../assests/pink_flower.png'),
    category: 'Outdoor',
    price: '$49',
    Height: '5m',
    Size: 'Small',
    Humidnity: '78%',
    rating: '4.9',
    review: 550,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'Brighten up your garden or home with this vibrant pink flower, known for its stunning hue and delicate petals. It blooms gracefully, adding a splash of color and charm to any setting. Easy to grow and care for, this flower thrives in both sun and partial shade. Perfect for bringing a touch of elegance and joy to your space.',
  },
  {
    id: '4',
    name: 'Green Potted ',
    image: require('../../assests/green_potted.png'),
    category: 'Popular',
    price: '$55',
    Height: '2m',
    Size: 'Small',
    Humidnity: '85%',
    rating: '4.9',
    review: 410,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'Add a touch of lush greenery to your space with this vibrant green potted plant. Its rich, verdant foliage brings a refreshing burst of nature indoors. Perfect for brightening up any room, it thrives with minimal care and is an ideal choice for both novice and experienced plant lovers. Enhance your home decor with this elegant and versatile addition.',
  },
  {
    id: '5',
    name: 'Cactus ',
    image: require('../../assests/cactus.png'),
    category: 'Popular',
    price: '$50',
    Height: '4m',
    Size: 'Small',
    Humidnity: '87%',
    rating: '4.5',
    review: 400,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'This hardy cactus adds a touch of desert charm to any space with its unique, spiky silhouette. Low-maintenance and drought-tolerant, it thrives on minimal watering and bright, indirect light. A perfect addition for adding a stylish, low-care green touch to your home.',
  },
  {
    id: '6',
    name: 'Ginkgo Tree ',
    image: require('../../assests/Ginkgo_Tree.png'),
    category: 'Indoor',
    price: '$45',
    Height: '10m',
    Size: 'Medium',
    Humidnity: '80%',
    rating: '4.6',
    review: 600,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'The Ginkgo Tree is a resilient, ancient species known for its fan-shaped leaves and vibrant yellow fall color. It thrives in urban environments and offers a unique aesthetic with its distinctive foliage. An excellent choice for adding character and longevity to your landscape.',
  },
  {
    id: '7',
    name: 'Green Greenery ',
    image: require('../../assests/Green_Greenery.png'),
    category: 'Indoor',
    price: '$57',
    Height: '4m',
    Size: 'Small',
    Humidnity: '81%',
    rating: '4.8',
    review: 410,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'Green Greenery brings a lush, refreshing touch to any space with its vibrant, dense foliage. Perfect for creating a serene, natural ambiance, it thrives indoors and outdoors. Its easy maintenance makes it an ideal choice for adding a splash of nature to your surroundings.',
  },
  {
    id: '8',
    name: 'Morning Glory Vine ',
    image: require('../../assests/Morning_Glory_Vine.png'),
    category: 'Popular',
    price: '$80',
    Height: '12m',
    Size: 'Large',
    Humidnity: '75%',
    rating: '4.7',
    review: 600,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'Morning Glory Vine showcases vibrant, trumpet-shaped blooms that open with the sunrise. This fast-growing plant adds a splash of color to trellises and fences, creating a stunning floral display. Its lush green foliage complements its striking flowers, making it a favorite for garden enthusiasts.',
  },
  {
    id: '9',
    name: 'Twisted Vine ',
    image: require('../../assests/Twisted_Vine.png'),
    category: 'Outdoor',
    price: '$70',
    Height: '20m',
    Size: 'Large',
    Humidnity: '84%',
    rating: '4.6',
    review: 550,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'Twisted Vine features intricately twisted stems that create a unique, eye-catching pattern in any garden. Its climbing nature makes it perfect for trellises and arbors, adding a touch of natural elegance. This hardy plant thrives in various conditions, offering both beauty and resilience.',
  },
  {
    id: '10',
    name: 'Green leaves ',
    image: require('../../assests/Green_leaves.png'),
    category: 'Outdoor',
    price: '$70',
    Height: '8m',
    Size: 'Large',
    Humidnity: '89%',
    rating: '4.3',
    review: 450,
    favouriteIcon: require('../../assests/love.png'),
    Description:
      'Green Leaves showcases a lush, vibrant canopy of foliage that brings a refreshing burst of nature to any space. Its glossy, verdant leaves provide a lush backdrop and excellent air-purifying qualities. Ideal for both indoor and outdoor settings, it effortlessly enhances your living environment.',
  },
];

const Home = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [data, setData] = useState([]);

  // const apiGetData = async () => {
  //   try {
  //     console.log('api get data');
  //     const url = 'http://localhost:4000/api/plants';

  //     console.log('url======>', url);

  //     const result = await fetch(url, {
  //       method: 'GET',
  //     });
  //     console.log(result, 'here is result');
  //     const res = await result.json();
  //     setData(res);
  //     console.log(res, 'here is data');
  //   } catch (err) {
  //     console.log('error=====>', err);
  //   }
  // };

  // useEffect(() => {
  //   apiGetData();
  // }, []);

  // const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const cart = useSelector((state: RootState) => state.cart.cart);
  // const dispatch=useDispatch()

  // useEffect(() => {
  //   if (isFocused) {
  //     const loadFavorites = async () => {
  //       try {
  //         const storedFavorites = await AsyncStorage.getItem('favouriteList');
  //         if (storedFavorites) {
  //           const favoriteList = JSON.parse(storedFavorites);
  //           favoriteList.forEach(item => dispatch(addFavorite(item)));
  //         }
  //       } catch (error) {
  //         console.error('Failed to load favorites from AsyncStorage', error);
  //       }
  //     };

  //     loadFavorites();
  //   }
  // }, [isFocused, dispatch]);

  const filterPlants = () => {
    let filteredPlants = plants;

    if (selectedCategory.categoryname !== 'All') {
      filteredPlants = filteredPlants.filter(
        plant => plant.category === selectedCategory.categoryname,
      );
    }

    if (searchQuery) {
      filteredPlants = filteredPlants.filter(plant =>
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return filteredPlants;
  };
  const handleSearchPress = () => {
    filterPlants();
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  const toggleFavorite = item => {
    const isFav = favorites.some(fav => fav.id === item.id);
    if (isFav) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };
  // const toggleFavorite = async item => {
  //   let updatedFavorites = [...favouriteList];
  //   const index = updatedFavorites.findIndex(fav => fav.id === item.id);

  //   if (index === -1) {
  //     updatedFavorites.push(item);
  //   } else {
  //     updatedFavorites.splice(index, 1);
  //   }
  //   setFavouriteList(updatedFavorites);
  //   await AsyncStorage.setItem(
  //     'favouriteList',
  //     JSON.stringify(updatedFavorites),
  //   );
  // };

  // const isFavorite = item => {
  //   return favouriteList.find(fav => fav.id === item.id);
  // };

  // const data = useSelector((state: RootState) => state.favorites.favorites);
  // const toggleFavorite = async item => {
  // if (data.find(fav => fav.id === item.id)) {
  //     // Retrieve the current cart
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
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Failed to add item to cart', error);
  //   }
  // };
  //   dispatch(removeFavorite(item.id));
  // } else {
  //   console.log('nnnnnn', data);
  //   dispatch(addFavorite(item));
  // }

  // try {
  //   await AsyncStorage.setItem('favouriteList', JSON.stringify(favorites));
  // } catch (error) {
  //   console.error('Failed to save favorites to AsyncStorage', error);
  // }
  // };

  const isFavorite = item => {
    return favorites.some(fav => fav.id === item.id);
  };

  const handleAddToCart = item => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (!existingItem) {
      dispatch(addToCart(item));
      navigation.navigate('AddToCart');
      // Alert.alert('Added to Cart', 'This item has been added to your cart.');
    } else {
      Alert.alert('Item Already in Cart', 'This item is already in your cart.');
    }
    // console.log(',,,,,', item);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchFieldContainer}>
        <TextInput
          style={styles.searchField}
          placeholder="Search plants..."
          placeholderTextColor={'black'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearchPress}>
          <Image
            style={styles.searchIcon}
            source={require('../../assests/search.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.txt}>Find your</Text>
          <Text style={styles.txt}>favorite plants</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.discountText}>30% OFF</Text>
          <Text style={styles.dateText}>02 - 23 July</Text>
        </View>

        <View style={styles.leafContainer}>
          <Image
            style={styles.leafImage}
            source={require('../../assests/leaf3.png')}
          />
        </View>
      </View>

      <View style={styles.components}>
        <ScrollView horizontal={true}>
          {categories.map(item => (
            <Categorie
              key={item.id}
              title={item.categoryname}
              onPress={() => handleCategoryPress(item)}
              selectedItem={
                selectedCategory.id === item.id ? 'black' : 'lightgray'
              }
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.ImagesContainer}>
        <FlatList
          data={filterPlants()}
          renderItem={({item, index}) => (
            <Card
              title={item.name}
              price={item.price}
              imageSource={item.image}
              favouriteIcon={item.favouriteIcon}
              onPress={() => navigation.navigate('PlantDetails', {plant: item})}
              onButtonPress={() => handleAddToCart(item)}
              onFavouriteToggle={() => toggleFavorite(item)}
              isFavourite={isFavorite(item)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingVertical: 25,
  //   alignItems: 'center',
  // },
  headerContainer: {
    paddingBottom: 15,
    paddingTop: 10,
  },

  txt: {
    color: 'black',
    fontSize: 30,
    // paddingVertical: 20,
    // fontWeight: 'bold',
    fontFamily: 'Nunito-ExtraBold',
  },
  // searchContainer: {
  //   borderRadius: 30,
  //   borderWidth: 3,
  //   borderColor: 'lightgray',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 12,
  // },

  content: {
    borderRadius: 20,
    backgroundColor: '#9DC183',
    height: 110,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 20,
    color: 'black',
    // fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
    letterSpacing: 1,
  },
  dateText: {
    fontSize: 15,
    color: 'gray',
    letterSpacing: 1,
    fontFamily: 'Nunito-Regular',
  },
  leafContainer: {
    position: 'absolute',
    right: 10,
    top: -40,
  },
  leafImage: {
    width: 120,
    height: 130,
    resizeMode: 'contain',
  },
  components: {
    paddingTop: 27,
  },
  ImagesContainer: {
    paddingTop: 20,
  },
  searchFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 10,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  searchField: {
    flex: 1,
    height: 40,
    color: 'black',
    padding: 10,
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor: 'lightgray',

    // marginLeft: 10,
  },
});

export default Home;
