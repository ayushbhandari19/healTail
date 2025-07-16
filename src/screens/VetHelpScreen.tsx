import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import vetClinics from '../../assets/data/vet.json';

export default function VetHelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleOpenMap = (location: string) => {
    const query = encodeURIComponent(location + ' veterinary clinic');
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  const handleWhatsApp = (clinicName: string, phone: string) => {
    const message = encodeURIComponent(
      `Hello, I need urgent veterinary help. Is someone available at ${clinicName}?`
    );
    const whatsappURL = `https://wa.me/${phone.replace('+', '')}?text=${message}`;
    Linking.openURL(whatsappURL);
  };

  const filteredClinics = vetClinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => handleCall(item.phone)}
      >
        <Text style={styles.callButtonText}>📞 Call Vet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => handleOpenMap(item.location)}
      >
        <Text style={styles.mapButtonText}>📍 Open in Maps</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={() => handleWhatsApp(item.name, item.phone)}
      >
        <Text style={styles.whatsappButtonText}>💬 WhatsApp SOS</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🆘 Emergency Vet Help</Text>
      <Text style={styles.subtext}>Find and contact nearby veterinary clinics</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by name or location"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filteredClinics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF8F2',
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 4,
    textAlign: 'center',
    color: '#333',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    color: '#777',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  callButton: {
    backgroundColor: '#FF8C42',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  mapButton: {
    backgroundColor: '#42a5f5',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
