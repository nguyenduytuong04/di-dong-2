import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Detail = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState(null);

  // Fetch product information
  const fetchProduct = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt-token');
      if (!token) {
        Alert.alert('Lỗi', 'Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/public/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setProduct(response.data);
      setIsFavorite(response.data.discount === 1);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // Add to cart
  const addToCart = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt-token');
      const email = await AsyncStorage.getItem('email');
      const cartId = await AsyncStorage.getItem('userId');

      if (!token || !email || !cartId) {
        Alert.alert('Lỗi', 'Thông tin người dùng không đầy đủ. Vui lòng đăng nhập lại.');
        return;
      }

      // Check if product exists in the cart
      const checkResponse = await axios.get(
        `http://localhost:8080/api/public/users/${encodeURIComponent(email)}/carts/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const existingProduct = checkResponse.data.products.find(item => item.productId === productId);
      const availableQuantity = checkResponse.data.products.find(item => item.productId === productId)?.availableQuantity;

      if (existingProduct) {
        // Update quantity if product already exists
        const newQuantity = existingProduct.quantity + quantity;

        if (newQuantity > availableQuantity) {
          Alert.alert('Lỗi', `Số lượng tối đa còn lại là ${availableQuantity}.`);
          return;
        }

        await axios.put(
          `http://localhost:8080/api/public/carts/${cartId}/products/${productId}/quantity/${newQuantity}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        Alert.alert('Cập nhật', 'Số lượng sản phẩm đã được cập nhật trong giỏ hàng.');
      } else {
        // Add new product if it does not exist
        if (quantity > availableQuantity) {
          Alert.alert('Lỗi', `Số lượng tối đa còn lại là ${availableQuantity}.`);
          return;
        }

        await axios.post(
          `http://localhost:8080/api/public/carts/${cartId}/products/${productId}/quantity/${quantity}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng.');
      }

      navigation.navigate('Cart');
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error.response?.data || error.message);
      if (error.response?.data?.message) {
        Alert.alert('Lỗi', error.response.data.message);
      } else {
        Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.');
      }
    }
  };

  // Toggle favorite status
  const toggleFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt-token');
      if (!token) {
        Alert.alert('Lỗi', 'Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
      }

      const updatedProduct = {
        ...product,
        discount: isFavorite ? 0 : 1,
      };

      const response = await axios.put(`http://localhost:8080/api/admin/products/${productId}`, updatedProduct, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setIsFavorite(!isFavorite);
        setFavoriteMessage(isFavorite ? 'Đã bỏ yêu thích sản phẩm' : 'Đã yêu thích sản phẩm');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu thích. Vui lòng thử lại sau.');
    }
  };

  const handleFavoriteMessagePress = () => {
    setFavoriteMessage(null);
    navigation.navigate('Favorite');
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  if (loading) {
    return <ActivityIndicator size="large" color="#FE724C" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!product) {
    return <Text>Product not found.</Text>;
  }

  return (
    <View style={styles.container}>
      {favoriteMessage && (
        <TouchableOpacity style={styles.favoriteMessageContainer} onPress={handleFavoriteMessagePress}>
          <Text style={styles.favoriteMessageText}>{favoriteMessage}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#888888" />
        </TouchableOpacity>
      </View>

      <Image 
        source={{ uri: `http://localhost:8080/api/public/products/image/${product.image}` }} 
        style={styles.productImage} 
      />

      <View style={styles.productInfoContainer}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{product.productName}</Text>
        </View>
      </View>

      <View style={styles.priceQuantityContainer}>
        <Text style={styles.productPrice}>{product.price} VNĐ</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.productDetails}>
        {product.description}
      </Text>

      <View style={styles.addCartContainer}>
        <TouchableOpacity style={styles.addCartButton} onPress={addToCart}>
          <Text style={styles.addCartButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  favoriteMessageContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  favoriteMessageText: {
    color: '#555',
  },
  backContainer: {
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  productImage: {
    width: '70%', // Adjust width as needed
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center', // Center the image
    borderWidth: 1, // Optional: Add a border
    borderColor: '#ddd', // Optional: Light gray border color
    shadowColor: '#000', // Optional: Shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  productInfoContainer: {
    marginBottom: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#888888',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  productDetails: {
    fontSize: 16,
    color: '#666',
  },
  addCartContainer: {
    alignItems: 'center',
  },
  addCartButton: {
    backgroundColor: '#888888',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  addCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
