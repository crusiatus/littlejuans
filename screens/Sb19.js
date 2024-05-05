import React, { useContext, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { CartContext } from './CartContext';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const itemWidth = (windowWidth - 40) / 3;

const Sb19 = () => {
  const { addToCart } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const members = [
    {
      id: 1,
      Name: 'Pablo',
      fullName: 'John Paulo Nase',
      role: 'Leader, Main Rapper, Lead Vocalist',
      description: 'Pablo is the leader and main rapper of SB19. He is also a skilled vocalist and plays a major role in composing and writing their songs.  Before joining SB19, he worked as a call center agent and data analyst.',
      image: require('../assets/sb191.jpg'),
    },
    {
      id: 2,
      Name: 'Josh',
      fullName: 'Joshua Garcia',
      role: 'Main Dancer, Lead Vocalist',
      description: 'Josh is known for his exceptional dancing skills and captivating stage presence. He is also a strong vocalist who brings energy to the group\'s performances.',
      image: require('../assets/sb192.jpg'),
    },
    {
      id: 3,
      Name: 'Stell',
      fullName: 'Stell Ajinomoto',
      role: 'Main Vocalist',
      description: 'Stell is known for his sweet and soulful vocals. He adds a unique layer of harmony to SB19\'s music.',
      image: require('../assets/sb193.jpg'),
    },
    {
      id: 4,
      Name: 'Ken',
      fullName: 'Ken Suson',
      role: 'Lead Vocalist, Visual',
      description: 'Ken is known for his stunning visuals and smooth vocals. He is a charming performer who captivates fans with his presence.',
      image: require('../assets/sb194.jpg'),
    },
    {
      id: 5,
      Name: 'Justin',
      fullName: 'Justin de Dios',
      role: 'Main Dancer, Vocalist, Maknae (youngest member)',
      description: 'Justin is the group\'s maknae (youngest member) and a skilled dancer. He brings a youthful energy to the group and contributes to their vocals.',
      image: require('../assets/sb195.jpg'),
    },
  ];

  const merchItems = [
    { id: 7, name: 'Sb19 Towel', price: 400.00, image: require('../assets/Sb19_merch/1.png') },
    { id: 8, name: 'Sb19 Photocard', price: 250.00, image: require('../assets/Sb19_merch/2.png') },
    { id: 9, name: 'Sb19 Mug', price: 300.00, image: require('../assets/Sb19_merch/3.png') },
    { id: 10, name: 'Sb19 Lightstick v1', price: 1250.00, image: require('../assets/Sb19_merch/4.png') },
    { id: 11, name: 'Sb19 Lightstick v2', price: 2000.00, image: require('../assets/Sb19_merch/5.png') },
    { id: 12, name: 'Sb19 Album', price: 1500.00, image: require('../assets/Sb19_merch/6.png') },
  ];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openMemberDetails = (member) => {
    setSelectedMember(member);
    toggleModal();
  };

  const renderMemberItem = ({ item }) => (
    <TouchableOpacity onPress={() => openMemberDetails(item)}>
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.memberName}>{item.Name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMerchItem = ({ item }) => (
    <View style={[styles.merchItem, { width: itemWidth }]}>
      <Image source={item.image} style={styles.merchItemImage} />
      <View style={styles.merchTextContainer}>
        <Text numberOfLines={2} style={styles.merchItemName}>{item.name}</Text>
        <Text style={styles.merchItemPrice}>₱{item.price}</Text>
      </View>
      <View style={styles.addToCartButton}>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/sb19.jpg')}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={styles.image}
        />
        <Text style={styles.title}>Sb19</Text>
        <Text style={styles.description}>SB19, a leading Filipino boy band formed in 2018, is known for their catchy P-Pop tunes, impressive dance routines, and positive messages. Self-managed under 1Z Entertainment, they've achieved international recognition with a Billboard Top 10 Social 50 placement and a devoted fanbase called A'TIN.</Text>
        <Text style={styles.members}>MEMBERS:</Text>
        <FlatList
          data={members}
          renderItem={renderMemberItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.carouselContainer}
          snapToInterval={200}
          decelerationRate="fast"
          snapToAlignment="start"
        />
        <Text style={styles.members}>MERCH:</Text>
        <FlatList
          data={merchItems}
          renderItem={renderMerchItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.merchContainer}
        />
        <Modal isVisible={modalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContent}>
            <Image source={selectedMember?.image} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedMember ? selectedMember.fullName : ''}</Text>
            <Text style={styles.modalRole}>{selectedMember ? selectedMember.role : ''}</Text>
            <Text style={styles.modalDescription}>{selectedMember ? selectedMember.description : ''}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  imageBackground: {
    width: windowWidth - 20,
    height: windowHeight / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#171717',
  },
  description: {
    fontSize: 16,
    color: '#171717',
    marginTop: 10,
  },
  members: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#171717',
    marginTop: 10,
  },
  carouselContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  carouselItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  carouselImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#171717',
    marginTop: 5,
  },
  merchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  merchItem: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  merchItemImage: {
    width: itemWidth - 40,
    height: itemWidth - 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  merchTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  merchItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#171717',
    textAlign: 'center',
  },
  merchItemPrice: {
    fontSize: 14,
    color: '#171717',
  },
  addToCartButton: {
    alignItems: 'center',
    backgroundColor: '#FF5733',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalRole: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  modalDescription: {
    textAlign: 'center',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
  },
});

export default Sb19;
