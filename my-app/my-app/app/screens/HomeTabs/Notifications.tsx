import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
const data = [
  {
    id: '1',
    name: 'Tuna Salad',
    price: '14.22$',
    rating: '4.8',
    image: require('../../../assets/images/a1.png'),
  },
  {
    id: '2',
    name: 'White Wine',
    price: '20.45$',
    rating: '4.4',
    image: require('../../../assets/images/a2.png'),
  },
  {
    id: '3',
    name: 'Espresso',
    price: '2$',
    rating: '4.7',
    image: require('../../../assets/images/a3.png'),
  },
  {
    id: '4',
    name: 'Profiterol',
    price: '1$',
    rating: '4.8',
    image: require('../../../assets/images/a4.png'),
    quantity: 8,
  },
];

const Notifications = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.rating}>
          <AntDesign name="star" size={16} color="gray" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favorite}>
        <AntDesign name="heart" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}>
        {item.quantity ? (
          <View style={styles.quantityContainer}>
            <FontAwesome name="minus" size={18} color="black" />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <FontAwesome name="plus" size={18} color="black" />
          </View>
        ) : (
          <FontAwesome name="plus" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search .."
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
  },
  favorite: {
    paddingHorizontal: 10,
  },
  addButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 5,
  },
  quantityText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
});
