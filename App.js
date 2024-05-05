import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from "react-native-safe-area-context";

import WelcomeScreen from './screens/Welcome';
import HomeScreen from './screens/Home';
import Faqs from './screens/Faqs';
import RateApp from './screens/RateApp';
import Contact from './screens/Contact';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Bini from './screens/Bini';
import Sb19 from './screens/Sb19';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import About from './screens/AboutUs';
import MusicPlayer from './screens/MusicPlayer';
import BiniMusicPlayer from './screens/BiniMusicPlayer';
import SB19MusicPlayer from './screens/SB19MusicPlayer';

import User from "./assets/user.jpg";
import { DrawerItemList } from "@react-navigation/drawer";
import { CartProvider } from './screens/CartContext'; // Import the CartProvider
import { CartContext } from './screens/CartContext'; // Import the CartContext

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
          <Stack.Screen name="Bini" component={Bini} options={({ navigation }) => ({
            headerRight: () => (
              <HeaderCartButton navigation={navigation} />
            ),
          })}/>
          <Stack.Screen name="Sb19" component={Sb19} options={({ navigation }) => ({
            headerRight: () => (
              <HeaderCartButton navigation={navigation} />
            ),
          })}/>
          <Stack.Screen name="Cart" component={Cart}/>
          <Stack.Screen name="Checkout" component={Checkout}/>
          <Stack.Screen name="BINIMusicPlayer" component={BiniMusicPlayer}/>
          <Stack.Screen name="SB19MusicPlayer" component={SB19MusicPlayer}/>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {({ navigation }) => (
              <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen 
                  name="Home" 
                  component={HomeScreen} 
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                    ),
                    headerRight: () => (
                      <HeaderCartButton navigation={navigation} />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="Music Player" 
                  component={MusicPlayer} 
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? 'musical-notes' : 'musical-notes-outline'} size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="About Us" 
                  component={About} 
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="FAQ's" 
                  component={Faqs} 
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? 'help-outline' : 'help-outline'} size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="Contact" 
                  component={Contact} 
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? 'mail' : 'mail-outline'} size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="Rate App" 
                  component={RateApp} 
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? 'star' : 'star-outline'} size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="Logout" 
                  component={WelcomeScreen} 
                  options={{ 
                    headerShown: false,
                    drawerIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? 'exit' : 'exit-outline'} size={size} color={color} />
                    ),
                  }}
                />
              </Drawer.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const HeaderCartButton = () => {
  const navigation = useNavigation();
  const { cartItems } = useContext(CartContext);

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 15 }}>
      <Ionicons name="cart-outline" size={25} color="#000" />
      {totalItems > 0 && (
        <Text style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, color: '#fff', padding: 2, fontSize: 12 }}>{totalItems}</Text>
      )}
    </TouchableOpacity>
  );
};


const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: 250,
          width: '100%',
          justifyContent: "center",
          alignItems: "center",
          borderBottomColor: "#f4f4f4",
          borderBottomWidth: 1
        }}
      >
        <Image
          source={User}
          style={{
            height: 130,
            width: 130,
            borderRadius: 65
          }}
        />
        <Text
          style={{
            fontSize: 22,
            marginVertical: 6,
            fontWeight: "bold",
            color: "#111"
          }}
        >Colet Vergara</Text>
        <Text
          style={{
            fontSize: 16,
            color: "#111"
          }}
        >User</Text>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  );
};

export default App;
  