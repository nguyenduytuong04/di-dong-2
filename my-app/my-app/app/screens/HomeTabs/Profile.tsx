import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Profile = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/path_to_avatar.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Huỳnh Khánh</Text>
        <TouchableOpacity style={styles.editButton}>
          <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Thông tin</Text>
        <View style={styles.setting}>
          <MaterialCommunityIcons name="phone-in-talk-outline" size={20} color="#000" />
          <Text style={styles.settingText}>+84 847747791</Text>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="#000" />
          <Text style={styles.settingText}>Tân Thành, Tân Thạnh, Long An, Việt Nam</Text>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <MaterialCommunityIcons name="cart-outline" size={20} color="#000" />
          <Text style={styles.settingText}>My Cart</Text>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('SignIn')}>
        <MaterialCommunityIcons name="arrow-right-box" size={20} color="#a52a2a" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  logoutText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#a52a2a',
  },
});
