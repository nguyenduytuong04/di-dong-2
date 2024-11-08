import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryItem = ({ onSelectCategory }: { onSelectCategory: (categoryId: number | null) => void }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy token! Vui lòng đăng nhập lại.');
        }

        const response = await fetch('http://localhost:8080/api/public/categories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data.content)) {
          setCategories(data.content);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => onSelectCategory(null)}
      >
        <Text style={styles.tabText}>All</Text> 
      </TouchableOpacity>

      {categories.length > 0 ? (
        categories.map((category) => (
          <TouchableOpacity
            key={category.categoryId}
            style={styles.tab}
            onPress={() => onSelectCategory(category.categoryId)}
          >
            <Text style={styles.tabText}>{category.categoryName}</Text> 
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noDataText}>Không có danh mục nào</Text>
      )}
    </ScrollView>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#999999",
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  noDataText: {
    fontSize: 14,
    color: "#888",
    textAlign: 'center', 
    paddingVertical: 20, 
  },
});
