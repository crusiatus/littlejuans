import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Button, FlatList, Alert, Dimensions } from 'react-native';
import { CartContext } from './CartContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Checkout = ({ navigation }) => {
  const { cartItems, totalAmount, resetCart } = useContext(CartContext);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const serviceFeePerItem = 5;
  const shippingFee = 200; // Shipping fee of 200 pesos

  const handlePlaceOrder = () => {
    if (validateBillingInfo()) {
      // Handle placing the order
      setModalVisible(true);
    }
  };

  const validateBillingInfo = () => {
    // Validate if billing information is filled out
    if (
      billingInfo.name === '' ||
      billingInfo.address === '' ||
      billingInfo.city === '' ||
      billingInfo.state === '' ||
      billingInfo.zip === '' ||
      billingInfo.phone === ''
    ) {
      Alert.alert('Incomplete Information', 'Please fill out all billing information.');
      return false;
    }
    return true;
  };

  const calculateServiceFee = () => {
    return cartItems.reduce((totalFee, item) => totalFee + serviceFeePerItem * item.quantity, 0);
  };

  const calculateTotalAmount = () => {
    const serviceFee = calculateServiceFee();
    return totalAmount + serviceFee + shippingFee;
  };

  const handleConfirmOrder = () => {
    if (validateBillingInfo()) {
      // Process order
      // For demonstration, just show payment modal
      setModalVisible(false);
      setPaymentModalVisible(true); // Set paymentModalVisible to true
    }
  };

  const handlePaymentMethod = (method) => {
    // Handle payment method selection
    // Reset cart and display thank you message
    resetCart();
    navigation.navigate('Home', { resetCart: true });
    setPaymentModalVisible(false);
    Alert.alert('Thank You', 'Thank you for ordering! We will update you soon.');
  };

  const handleTransactionComplete = () => {
    // Handle transaction completion
    setConfirmationModalVisible(false);
    // Show alert message
    Alert.alert('Transaction Complete', 'Your transaction is complete. Thank you!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Billing Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={billingInfo.name}
        onChangeText={(text) => setBillingInfo({ ...billingInfo, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={billingInfo.address}
        onChangeText={(text) => setBillingInfo({ ...billingInfo, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={billingInfo.city}
        onChangeText={(text) => setBillingInfo({ ...billingInfo, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={billingInfo.state}
        onChangeText={(text) => setBillingInfo({ ...billingInfo, state: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={billingInfo.zip}
        onChangeText={(text) => setBillingInfo({ ...billingInfo, zip: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={billingInfo.phone}
        onChangeText={(text) => setBillingInfo({ ...billingInfo, phone: text })}
        keyboardType="phone-pad"
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeading}>Items Ordered</Text>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>{item.name} - ₱{item.price} x {item.quantity}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <Text style={styles.totalAmount}>Subtotal: ₱{totalAmount}</Text>
        <Text style={styles.totalAmount}>Service Fee: ₱{calculateServiceFee()}</Text>
        <Text style={styles.totalAmount}>Shipping Fee: ₱{shippingFee}</Text>
        <Text style={styles.totalAmount}>Total Amount: ₱{calculateTotalAmount()}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Modal for order confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Billing Information</Text>
            <Text>Name: {billingInfo.name}</Text>
            <Text>Address: {billingInfo.address}, {billingInfo.city}, {billingInfo.state}, {billingInfo.zip}</Text>
            <Text>Phone: {billingInfo.phone}</Text>
            <Text style={styles.modalText}>Items Ordered</Text>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text>{item.name} - ₱{item.price} x {item.quantity}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.totalAmount}>Subtotal: ₱{totalAmount}</Text>
            <Text style={styles.totalAmount}>Service Fee: ₱{calculateServiceFee()}</Text>
            <Text style={styles.totalAmount}>Shipping Fee: ₱{shippingFee}</Text>
            <Text style={styles.totalAmount}>Total Amount: ₱{calculateTotalAmount()}</Text>
            <Button title="Confirm Order" onPress={handleConfirmOrder} />
          </View>
        </View>
      </Modal>

      {/* Modal for payment method selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(!paymentModalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Payment Method</Text>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handlePaymentMethod('credit')}>
              <Text>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handlePaymentMethod('paypal')}>
              <Text>PayPal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handlePaymentMethod('cod')}>
              <Text>Cash on Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmation modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => setConfirmationModalVisible(!confirmationModalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Transaction Complete</Text>
            <Button title="OK" onPress={handleTransactionComplete} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 10,
    width: '100%',
  },
  summaryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalAmount: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: windowWidth * 0.8,
    maxHeight: windowHeight * 0.8,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
});

export default Checkout;
