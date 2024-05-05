import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Faqs = () => {
  const [faqs, setFaqs] = useState([
    { question: "How can I purchase merchandise?", answer: "You can purchase merchandise directly from the app by navigating to the 'Store' section." },
    { question: "Can I listen to music while browsing merchandise?", answer: "Yes, you can listen to music from the app's music player while browsing merchandise." },
    { question: "Are there discounts available for frequent buyers?", answer: "Yes, we offer discounts and special deals for our loyal customers. Keep an eye on our promotions!" },
    { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to most countries. Shipping rates and delivery times may vary depending on the destination." },
    { question: "How can I reset my password?", answer: "You can reset your password by going to the 'Account' section of the app and selecting the 'Forgot Password' option." },
    { question: "Is there a return policy for merchandise?", answer: "Yes, we have a flexible return policy. If you're not satisfied with your purchase, you can return it within 30 days for a full refund." },
    { question: "Can I download music for offline listening?", answer: "Yes, you can download music for offline listening by tapping the download icon next to the song or album you want to save." },
    { question: "Are there exclusive merchandise items available?", answer: "Yes, we often release exclusive merchandise items that are only available for a limited time. Make sure to check our 'Exclusive' section regularly!" },
    { question: "How can I contact customer support?", answer: "You can contact our customer support team by emailing support@example.com or by using the live chat feature in the app." },
    { question: "Are there any subscription plans available?", answer: "Yes, we offer subscription plans that provide access to exclusive content, discounts, and special features. Check out the 'Subscription' section for more details." },
    // Add more FAQs as needed
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleFAQ = (index) => {
    if (expandedId === index) {
      setExpandedId(null);
    } else {
      setExpandedId(index);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={[styles.logo, { tintColor: 'black' }]} // Apply tintColor to make the logo black
      />
      <Text style={styles.header}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <TouchableOpacity onPress={() => toggleFAQ(index)}>
            <Text style={styles.question}>{faq.question}</Text>
          </TouchableOpacity>
          {expandedId === index && (
            <Text style={styles.answer}>{faq.answer}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark grey color
  },
  faqContainer: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#171717', // You can change the color as needed
  },
  answer: {
    fontSize: 16,
    color: '#666', // Dark grey color
  },
});

export default Faqs;
