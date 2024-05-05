import React from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from "react-native";
import { useFonts, JosefinSans_400Regular, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { Ionicons } from '@expo/vector-icons';
import estigoyImage from '../assets/estigoy.jpg';
import lopezImage from '../assets/lopez.png';
import lagunoyImage from '../assets/lagunoy.png';
import delacruzImage from '../assets/delacruz.jpg';
import espirituImage from '../assets/espiritu.jpg';

const About = () => {
  const [fontsLoaded] = useFonts({ JosefinSans_400Regular, JosefinSans_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.companyBackground}>
        <Text style={styles.mainHeader}>Company Background</Text>
        <Text style={styles.paraStyle}>
          Little Juans is a dynamic e-commerce platform specializing in connecting local 
          music artists with their fans through a seamless mobile application experience. 
          Founded by Merci, a passionate music enthusiast and entrepreneur, the company 
          aims to empower independent musicians by providing them with a dedicated marketplace 
          to showcase and sell their merchandise directly to their audience.
        </Text>
      </View>

      <Text style={styles.mainHeader}>Our Team</Text>
      <View style={styles.developersContainer}>
        {teamMembers.map((member, index) => (
          <Developer key={index} name={member.name} role={member.role} imageUrl={member.imageUrl} />
        ))}
      </View>

      <Text style={styles.mainHeader}>Follow us on Social Networks</Text>
      <View style={styles.socialContainer}>
        <SocialButton
          onPress={() => Linking.openURL("https://www.instagram.com/teamunodumpp/?hl=en")}
          icon={<Ionicons name="logo-instagram" size={24} color="black" />}
        />
        <SocialButton
          onPress={() => Linking.openURL("")}
          icon={<Ionicons name="logo-twitter" size={24} color="black" />}
        />
        <SocialButton
          onPress={() => Linking.openURL("https://discord.gg/wR5H3wNs")}
          icon={<Ionicons name="logo-discord" size={24} color="black" />}
        />
      </View>
    </ScrollView>
  );
};

const Developer = ({ name, role, imageUrl }) => {
  return (
    <View style={styles.developerContainer}>
      <Image style={styles.imgStyle} source={imageUrl} />
      <View style={styles.developerInfo}>
        <Text style={styles.developerName}>{name}</Text>
        <Text style={styles.developerRole}>{role}</Text>
      </View>
    </View>
  );
};

const SocialButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

const teamMembers = [
  { name: "Ceejay Estigoy", role: "Full Stack Developer", imageUrl: estigoyImage },
  { name: "Mark Justin Dela Cruz", role: "Full Stack Developer", imageUrl: delacruzImage },
  { name: "Jin Leira Lopez", role: "Full Stack Developer", imageUrl: lopezImage },
  { name: "Kristine Eunice Lagunoy", role: "Graphic Designer", imageUrl: lagunoyImage },
  { name: "Kathrina Espiritu Santo", role: "Graphic Designer", imageUrl: espirituImage },
];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  companyBackground: {
    marginBottom: 20,
    backgroundColor: "#fff",
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
  developersContainer: {
    marginBottom: 20,
  },
  developerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
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
  developerInfo: {
    marginLeft: 20,
  },
  developerName: {
    fontSize: 18,
    color: "#000",
    fontFamily: "JosefinSans_700Bold",
  },
  developerRole: {
    fontSize: 16,
    color: "#333",
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  mainHeader: {
    fontSize: 20,
    color: "#000",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "JosefinSans_700Bold",
  },
  paraStyle: {
    fontSize: 16,
    color: "#333",
    paddingBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  buttonStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default About;
