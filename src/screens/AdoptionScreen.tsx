import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  useColorScheme,
  Alert,
} from 'react-native';
import petData from '../../assets/data/pets.json';
import { Pet } from '../models/pet';

export default function AdoptionScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const scheme = useColorScheme();
  const [userEmail, setUserEmail] = useState('');
const [userAddress, setUserAddress] = useState('');
const [userGovId, setUserGovId] = useState('');
const [userNotes, setUserNotes] = useState('');


  const handleAdoptPress = (pet: Pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!userName || !userPhone || !userEmail || !userAddress || !userGovId) {
      Alert.alert('Incomplete Form', 'Please fill out all required fields.');
      return;
    }
  
    const adoptionInfo = {
      name: userName,
      phone: userPhone,
      email: userEmail,
      address: userAddress,
      govId: userGovId,
      notes: userNotes,
      pet: selectedPet,
    };
  
    console.log('Adoption Info Submitted:', adoptionInfo);
    Alert.alert('Application Sent', 'Thank you for your interest in adoption!');
    
    // Reset form
    setUserName('');
    setUserPhone('');
    setUserEmail('');
    setUserAddress('');
    setUserGovId('');
    setUserNotes('');
    setModalVisible(false);
  };
  

  const filteredPets = petData.filter((pet: Pet) =>
    `${pet.name} ${pet.breed} ${pet.gender}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPetImage = (imageName: string) => {
    switch (imageName) {
      case 'pet1.jpg':
        return require('../../assets/pet1.jpg');
      case 'pet2.jpg':
        return require('../../assets/pet2.jpg');
      default:
        return require('../../assets/default.jpg');
    }
  };

  const isDark = scheme === 'dark';
  const themedStyles = getStyles(isDark);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.heading}>Pet Adoption</Text>
      <TextInput
        style={themedStyles.searchInput}
        placeholder="Search by name, breed, or gender"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={isDark ? '#ccc' : '#666'}
      />

      {filteredPets.length === 0 ? (
        <Text style={themedStyles.noResults}>No pets match your search.</Text>
      ) : (
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={themedStyles.card}>
              <Image source={getPetImage(item.image)} style={themedStyles.image} />
              <Text style={themedStyles.name}>{item.name}</Text>
              <Text>{item.breed} | {item.gender} | {item.age}</Text>
              <Text style={themedStyles.location}>{item.location}</Text>
              <TouchableOpacity style={themedStyles.button} onPress={() => handleAdoptPress(item)}>
                <Text style={themedStyles.buttonText}>Adopt Now</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

<Modal visible={modalVisible} animationType="slide" transparent>
  <View style={themedStyles.modalOverlay}>
    <View style={themedStyles.modalContainer}>
      <Text style={themedStyles.modalTitle}>Adoption Form</Text>

      <TextInput
        placeholder="Your Full Name"
        value={userName}
        onChangeText={setUserName}
        style={themedStyles.input}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={userEmail}
        onChangeText={setUserEmail}
        style={themedStyles.input}
      />
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={userPhone}
        onChangeText={setUserPhone}
        style={themedStyles.input}
      />
      <TextInput
        placeholder="Address"
        multiline
        numberOfLines={3}
        value={userAddress}
        onChangeText={setUserAddress}
        style={[themedStyles.input, themedStyles.textArea]}
      />
      <TextInput
        placeholder="Govt ID / Aadhar No."
        value={userGovId}
        onChangeText={setUserGovId}
        style={themedStyles.input}
      />
      <TextInput
        placeholder="Why do you want to adopt?"
        multiline
        numberOfLines={3}
        value={userNotes}
        onChangeText={setUserNotes}
        style={[themedStyles.input, themedStyles.textArea]}
      />

      <TouchableOpacity style={themedStyles.submitButton} onPress={handleSubmit}>
        <Text style={themedStyles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text style={themedStyles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>



    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: 50,
      paddingHorizontal: 16,
      backgroundColor: isDark ? '#121212' : '#fff',
      flex: 1,
    },
    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 12,
      alignSelf: 'center',
      color: isDark ? '#fff' : '#000',
    },
    searchInput: {
      height: 45,
      borderColor: '#888',
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 10,
      marginBottom: 16,
      color: isDark ? '#fff' : '#000',
      backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0',
    },
    noResults: {
      textAlign: 'center',
      marginTop: 50,
      color: isDark ? '#ccc' : '#555',
      fontSize: 16,
    },
    card: {
      backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      alignItems: 'center',
      elevation: 3,
    },
    image: {
      width: 180,
      height: 180,
      borderRadius: 16,
      marginBottom: 12,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    location: {
      fontStyle: 'italic',
      marginBottom: 8,
      color: isDark ? '#bbb' : '#444',
    },
    button: {
      marginTop: 10,
      backgroundColor: '#4caf50',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 24,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: isDark ? '#333' : '#fff',
      borderRadius: 20,
      padding: 24,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      color: isDark ? '#fff' : '#000',
    },
    input: {
      height: 45,
      borderColor: '#aaa',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 12,
      backgroundColor: isDark ? '#222' : '#fff',
      color: isDark ? '#fff' : '#000',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textArea: {
      height: 80,
      textAlignVertical: 'top',
    },
    submitButton: {
      backgroundColor: '#28a745',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    cancelText: {
      color: '#555',
      textAlign: 'center',
      marginTop: 10,
    },
    
  });
