import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendMessage = () => {
    const { name, email, phone, message } = formData;
    if (name && email && phone && message) {
      // Here you can implement your logic to send the message
      Alert.alert('Message Sent', 'Your message has been sent successfully.');
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={styles.subHeader}>
        Drop us a message. We will send you an email and one of our customer service agents will contact you.
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={formData.phone}
          onChangeText={text => handleChange('phone', text.replace(/[^0-9]/g, ''))}
          keyboardType="phone-pad"
        />
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.input, { height: 120 }]}
          placeholder="Message"
          value={formData.message}
          onChangeText={text => handleChange('message', text)}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.button}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Arial',
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});
