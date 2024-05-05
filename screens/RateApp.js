import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

// Import your logo
import logo from '../assets/logo-black.png'

export default function RateApp() {
  const [rating, setRating] = useState(0); // State to store the rating

  // Function to handle star click
  const handleStarClick = (star) => {
    setRating(star);
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>Rate Our App</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} style={styles.star} onPress={() => handleStarClick(star)}>
            {/* You can place your star icon here */}
            <Text>{star <= rating ? '⭐️' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.description}>
        How would you rate your experience using our application? Your feedback helps us improve.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  star: {
    marginRight: 10,
    fontSize: 30
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20
  }
});
