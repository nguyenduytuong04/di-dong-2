import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const products = [
  { id: 1, name: 'Cappuccino', price: '3$', image: require('../../../assets/images/h1.png') },
  { id: 2, name: 'Latte', price: '4$', image: require('../../../assets/images/h3.png') },
  { id: 3, name: 'Espresso', price: '2$', image: require('../../../assets/images/h2.png') },
  { id: 4, name: 'Mocha', price: '3.5$', image: require('../../../assets/images/h4.png') },
  { id: 5, name: 'Profiterol', price: '1$', image: require('../../../assets/images/a4.png') },
  { id: 6, name: 'Espresso', price: '2$', image: require('../../../assets/images/a3.png') },
];

const banners = [
  require('../../../assets/images/bn1.jpg'),
  require('../../../assets/images/bn2.jpg'),
  require('../../../assets/images/bn3.png'),
];

const Feed = ( {navigation}: {navigation: any} ) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const bannerIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      bannerIndex.current = (bannerIndex.current + 1) % banners.length;
      scrollViewRef.current.scrollTo({ x: bannerIndex.current * width, animated: true });
    }, 3000); // Thời gian chuyển đổi banner (3 giây)

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Địa chỉ và biểu tượng */}
      <View style={styles.play}>
        <MaterialCommunityIcons name="map-marker" size={20} color="brown" />
        <Text style={styles.address} onPress={() => navigation.navigate('Map')}>Tân Thành, Tân Thạnh, Long An, Việt Nam </Text>
        <MaterialCommunityIcons style={styles.dome} name="phone-in-talk-outline" size={20} color="brown" />
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="gray" />
        <TextInput placeholder="Search..." style={styles.searchInput} />
      </View>

      {/* Banners tự động cuộn */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        style={styles.bannerContainer}
      >
        {banners.map((banner, index) => (
          <Image key={index} source={banner} style={styles.banner} />
        ))}
      </ScrollView>

      {/* Tiêu đề danh mục */}
      <Text style={styles.categoryTitle}>Categories</Text>

      {/* Các nút danh mục */}
      <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.categories}>
          {['COFFEE', 'DESSERTS', 'ALCOHOL', 'ALCOHOL FREE', 'BREAKFAST'].map((category, index) => (
            <View key={index} style={styles.categoryButton}>
              <MaterialCommunityIcons name={getIconName(category)} size={20} color="white" />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.categoryTitle}>Products</Text>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('Productdetail')}
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.sizeSelector}>
              <TouchableOpacity style={[styles.sizeButton, styles.selectedSize]}>
                <Text style={styles.sizeTextSelected}>S</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.sizeText}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.sizeText}>L</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.addButton}>
                <MaterialCommunityIcons name="plus" size={10} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

// Helper function to get icon names based on category
const getIconName = (category) => {
  switch (category) {
    case 'COFFEE':
      return 'coffee';
    case 'DESSERTS':
      return 'cupcake';
    case 'ALCOHOL':
      return 'glass-wine';
    case 'ALCOHOL FREE':
      return 'cup-water';
    case 'BREAKFAST':
      return 'food-croissant';
    default:
      return 'coffee'; // Default icon
  }
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  bannerContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  banner: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  play: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  address: {
    fontSize: 14,
    marginLeft: 10,
    color: 'brown',
  },
  dome: {
    marginLeft: 'auto',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scrollView: {
    maxHeight: '100%',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 60,
    padding: 5,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6a1b9a',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
    width: 140,
  },
  categoryText: {
    color: 'white',
    marginLeft: 5,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    margin: 10,
    height: 150,
    width: '45%',
  },
  productImage: {
    width: 100,
    height: 60,
    borderRadius: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sizeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 1,
  },
  sizeButton: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: '#f0f0f0',
  },
  selectedSize: {
    backgroundColor: '#A0522D',
  },
  sizeText: {
    color: '#000',
    fontSize: 10,
  },
  sizeTextSelected: {
    color: '#fff',
    fontSize: 10,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 80,
  },
  addButton: {
    backgroundColor: '#A0522D',
    padding: 10,
    borderRadius: 50,
  },
  row: {
    justifyContent: 'space-between',
  },
});
