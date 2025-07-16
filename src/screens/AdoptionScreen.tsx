import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import pets from '../../assets/data/pets.json';

const petImages: Record<string, any> = {
  'pet1.jpg': require('../../assets/pet1.jpg'),
  'pet2.jpg': require('../../assets/pet2.jpg'),
};
const defaultImage = require('../../assets/default.jpg');

export default function AdoptionScreen() {
  const renderItem = ({ item }: any) => {
    const imageSource = petImages[item.image] || defaultImage;

    return (
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>
          🐶 {item.breed} | 🎂 {item.age} | 🚻 {item.gender}
        </Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🐾 Available Pets for Adoption</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  details: { fontSize: 14, color: '#666', marginBottom: 4 },
  location: { fontSize: 13, color: '#999', marginBottom: 10 },
  button: {
    backgroundColor: '#FF8C42',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
