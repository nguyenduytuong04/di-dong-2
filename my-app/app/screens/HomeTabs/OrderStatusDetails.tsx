import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'; // Để sử dụng navigation

const OrderStatusDetails = () => {
  const navigation = useNavigation(); // Khởi tạo navigation

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/success.json')} // Đường dẫn tới success.json
        autoPlay
        loop={true} // Đặt thuộc tính loop thành true để lặp lại không dừng
        style={styles.lottieAnimation}
      />
      
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Quay về Trang Chính</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
    alignItems: 'center', // Căn giữa nội dung theo chiều ngang
    backgroundColor: '#fff', // Màu nền trắng
  },
  lottieAnimation: {
    width: 100, // Kích thước của animation
    height: 100,
  },
  homeButton: {
    marginTop: 20, // Khoảng cách phía trên nút
    padding: 10,
    backgroundColor: '#888888', // Màu nền của nút
    borderRadius: 10, // Bo góc nút
  },
  homeButtonText: {
    color: '#fff', // Màu chữ
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderStatusDetails;
