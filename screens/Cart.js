// Cart.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';
import { Ionicons } from '@expo/vector-icons';

const Cart = () => {
  const { cartItems, removeItem, incrementQuantity, decrementQuantity, totalAmount } = useContext(CartContext);
  const navigation = useNavigation();

  const serviceFee = cartItems.reduce((totalFee, item) => totalFee + 5 * item.quantity, 0);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <Image source={item.image} style={styles.itemImage} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₱{item.price}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity onPress={() => decrementQuantity(item)}>
          <Ionicons name="remove" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => incrementQuantity(item)}>
          <Ionicons name="add" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(item)}>
        <Ionicons name="close" size={20} color="#FF5733" />
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is Empty', 'Please add items to the cart before checking out.');
    } else {
      navigation.navigate('Checkout', { cartItems, totalAmount });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.feeText}>Service Fee (₱5 per item): ₱{serviceFee}</Text>
        <Text style={styles.totalText}>Total: ₱{totalAmount + serviceFee}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
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
  itemImageContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  feeText: {
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#171717',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
