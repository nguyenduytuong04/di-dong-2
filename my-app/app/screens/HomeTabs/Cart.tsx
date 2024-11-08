import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailId, setEmailId] = useState(null);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const cart = await AsyncStorage.getItem('userId');
        if (email && cart) {
          setEmailId(email);
          setCartId(parseInt(cart, 10));
        } else {
          Alert.alert("Lỗi", "Không tìm thấy email hoặc ID giỏ hàng. Vui lòng đăng nhập.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchCartItems = async () => {
        if (!emailId || !cartId) return;

        try {
          const token = await AsyncStorage.getItem('jwt-token');
          if (!token) {
            Alert.alert('Lỗi', 'Token không tồn tại. Vui lòng đăng nhập lại.');
            return;
          }

          const encodedEmail = encodeURIComponent(emailId);
          const response = await fetch(`http://localhost:8080/api/public/users/${encodedEmail}/carts/${cartId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            const fetchedItems = result.products.map(item => ({
              ...item,
              quantity: item.quantity || 0, // Thiết lập mặc định nếu không có
            }));
            setCartItems(fetchedItems);
          } else {
            Alert.alert("Lỗi", "Không thể tải thông tin giỏ hàng.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy mục giỏ hàng:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCartItems();
    }, [emailId, cartId])
  );

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateDeliveryFee = () => 30000;
  const calculateTotalPrice = () => calculateSubtotal() + calculateDeliveryFee();
  
  const removeItem = async (index) => {
    try {
      const token = await AsyncStorage.getItem('jwt-token');
      if (!token) {
        Alert.alert('Lỗi', 'Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
      }

      const productId = cartItems[index].productId;
      const response = await fetch(`http://localhost:8080/api/public/carts/${cartId}/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        Alert.alert("Thông báo", "Xóa sản phẩm thành công.");
      } else {
        Alert.alert("Lỗi", "Không thể xóa sản phẩm khỏi giỏ hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa sản phẩm.");
    }
  };

  const increaseQuantity = async (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
  
    try {
      const token = await AsyncStorage.getItem('jwt-token');
      if (!token) {
        Alert.alert('Lỗi', 'Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
      }
  
      await fetch(`http://localhost:8080/api/public/carts/${cartId}/products/${newCartItems[index].productId}/quantity/${newCartItems[index].quantity}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  const decreaseQuantity = async (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
  
      try {
        const token = await AsyncStorage.getItem('jwt-token');
        if (!token) {
          Alert.alert('Lỗi', 'Token không tồn tại. Vui lòng đăng nhập lại.');
          return;
        }
  
        await fetch(`http://localhost:8080/api/public/carts/${cartId}/products/${newCartItems[index].productId}/quantity/${newCartItems[index].quantity}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCartItems(newCartItems);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const renderRightActions = (index) => (
    <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
      <MaterialCommunityIcons name="delete" size={30} color="white" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#888888" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Giỏ hàng</Text>
      
      {cartItems.length > 0 ? (
        <ScrollView>
          {cartItems.map((item, index) => (
            <Swipeable key={index} renderRightActions={() => renderRightActions(index)}>
              <View style={styles.cartItem}>
                <Image source={{ uri: `http://localhost:8080/api/public/products/image/${item.image}` }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text numberOfLines={2} style={styles.productDescription}>
                    {item.description.split(" ").slice(0, 12).join(" ")}{item.description.split(" ").length > 12 ? "..." : ""}
                  </Text>
                  <View style={styles.priceAndQuantity}>
                    <Text style={styles.productPrice}>{item.price} VNĐ</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(index)}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(index)}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {index < cartItems.length - 1 && <View style={styles.divider} />}
            </Swipeable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyCartContainer}>
          
          <Text style={styles.emptyCartText}>Không có sản phẩm trong giỏ hàng</Text>
        </View>
      )}

      {cartItems.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Tổng tiền hàng</Text>
            <Text style={styles.value}>{calculateSubtotal()} VNĐ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tổng tiền phí vận chuyển</Text>
            <Text style={styles.value}>{calculateDeliveryFee()} VNĐ</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng thanh toán: {calculateTotalPrice()} VNĐ</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('CheckInfoScreen')}>
              <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  priceAndQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#888888',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#888888',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888888',
  },
  totalContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888888',
  },
  checkoutButton: {
    backgroundColor: '#888888',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
    borderRadius: 8,
    padding: 10,
  },
});
