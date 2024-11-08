import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductItem = ({ selectedCategory, searchQuery = '' }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const pageSize = 10; // Define page size

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt-token');
      if (!token) {
        throw new Error('Token không tồn tại! Vui lòng đăng nhập lại.');
      }

      let url = 'http://localhost:8080/api/public/products';
      const params = {
        pageNumber: pageNumber, // Include page number
        pageSize: pageSize, // Include page size
      };

      if (selectedCategory) {
        url = `http://localhost:8080/api/public/categories/${selectedCategory}/products`;
      } else if (searchQuery) {
        url = `http://localhost:8080/api/public/products/keyword/${searchQuery}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params, // Include params in the request
      });

      console.log("API response data:", response.data.content);
      setProducts(response.data.content || []);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, pageNumber]); // Add pageNumber to the dependencies

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category.categoryId === selectedCategory : true;
    const matchesSearch = searchQuery ? product.productName.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  // Calculate start and end index for the current page
  const startIndex = pageNumber * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the filtered products based on current page
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  console.log("Filtered and displayed products:", displayedProducts);

  return (
    <>
      <View style={styles.columnWrapper}>
        {displayedProducts.length === 0 ? (
          <Text>Không có sản phẩm nào để hiển thị.</Text>
        ) : (
          displayedProducts.map((item) => (
            <View key={item.productId} style={styles.productContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Productdetail', { productId: item.productId })}
                style={styles.productItem}
              >
                <Image source={{ uri: `http://localhost:8080/api/public/products/image/${item.image}` }} style={styles.productImage} />
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>{item.price} VNĐ</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Icon name="shopping-cart" size={24} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  popular: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454545',
    marginVertical: 20,
    width: '90%',
  },
  productContainer: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
  productItem: {
    backgroundColor: '#fdfbfb',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    width: '100%',
    height: 230,
  },
  productImage: {
    width: '80%',
    height: 100,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    marginTop: 5,
    fontSize: 12,
    color: '#888888',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  columnWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    elevation: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  paginationText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
