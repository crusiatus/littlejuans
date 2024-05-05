import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import Carousel from "../components/Carousel";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.heading}>Recent Events</Text>
      <SafeAreaView>
        <Carousel />
      </SafeAreaView>
      <Text style={styles.heading}>Artists</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Sb19")} style={styles.button}>
          <Image source={require('../assets/sb19.jpg')} style={styles.buttonImage} />
          <Text style={styles.buttonLabel}>SB19</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Bini")} style={styles.button}>
          <Image source={require('../assets/bini.jpg')} style={styles.buttonImage} />
          <Text style={styles.buttonLabel}>BINI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 3,
    textTransform: "uppercase",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonImage: {
    width: '100%',
    height: 200, // adjust height according to your requirement
    resizeMode: 'cover',
  },
  buttonLabel: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default Home;
