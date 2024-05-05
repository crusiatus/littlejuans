  import React, { useContext, useState } from 'react';
  import { View, Text, ImageBackground, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
  import { CartContext } from './CartContext';
  import Modal from 'react-native-modal';

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const itemWidth = (windowWidth - 40) / 3;

  const Bini = () => {
    const { addToCart } = useContext(CartContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const members = [
      {
        id: 1,
        Name: 'Jhoanna',
        fullName: 'Jhoanna Christine Robles',
        role: 'Leader, Lead Vocalist, Lead Rapper',
        description: 'Jhoanna loves music with her favorite colors being black, white, and mustard yellow. Shes an only child and excels as a student. Mojos and fries are her favorite snacks and shes skilled at playing the guitar and ukulele. Previously, Jhoanna was a majorette and lyrist, and she has a talent for news reporting. Shes consistently taken on leadership roles in school and has a passion for singing. Additionally, she appeared in the popular TV show "Kadenang Ginto on MMK." Her motto is "Dont just dream it, do it."',
        image: require('../assets/bini1.jpg')
      },
      {
        id: 2,
        Name: 'Aiah',
        fullName: 'Maraiah Queen Arceta',
        role: 'Main Vocalist',
        description: 'Aiah is known for her powerful vocals and stage presence. She is a versatile performer.',
        image: require('../assets/bini2.jpg')
      },
      {
        id: 3,
        Name: 'Colet',
        fullName: 'Ma. Nicolette Vergara',
        role: 'Main Vocalist, Lead Dancer, Lead Rapper',
        description: 'Colet is the group\'s main dancer. She is known for her precise choreography and dynamic movements.',
        image: require('../assets/bini3.jpg')
      },
      {
        id: 4,
        Name: 'Maloi',
        fullName: 'Mary Loi Yves Ricalde',
        role: 'Lead Dancer, Vocalist',
        description: 'Maloi is a multi-talented artist who excels in singing, dancing, and acting. She is a natural entertainer.',
        image: require('../assets/bini4.jpg')
      },
      {
        id: 5,
        Name: 'Gwen',
        fullName: 'Gweneth Rythmica Apuli',
        role: 'Maknae (youngest member)',
        description: 'Gwen is known for her bubbly personality and infectious energy. She is loved by fans for her outgoing nature.',
        image: require('../assets/bini5.jpg')
      },
      {
        id: 6,
        Name: 'Stacey',
        fullName: 'Lindtsey Stacey Aubrey Sevilleja',
        role: 'Lead Rapper, Vocalist',
        description: 'Stacey is a skilled rapper and vocalist. She adds a unique flavor to the group\'s music with her rap verses.',
        image: require('../assets/bini6.jpg')
      },
      {
        id: 7,
        Name: 'Mikha',
        fullName: 'Mikhaela Janna Lim',
        role: 'Main Rapper, Lead Dancer, Visual',
        description: 'Mikha, originally from Cebu City, has lived in various places including Sta. Rosa Laguna, Silang Cavite, San Juan, and currently resides in QC. Her family resides in Silang, Cavite, while her brother lives in the US. Red and black are her favorite colors, and she enjoys sports, sleeping, watching K-dramas, and anime. With a special talent in flexibility, Mikha was a cheer dancer for nearly two years but felt unsure about her dancing skills upon entering the training program. Singing is her favorite subject, and her life motto is Dreams will only stay dreams unless you act upon it. Additionally, she appeared in the Filipino drama Hes Into Her.',
        image: require('../assets/bini7.jpg')
      },
      {
        id: 8,
        Name: 'Sheena',
        fullName: 'Sheena Mae Catacutan',
        role: 'Sub Vocalist, Lead Dancer',
        description: 'Sheena is known for her sweet vocals and graceful dance moves. She is often praised for her stage presence.',
        image: require('../assets/bini8.jpg')
      },
    ];

    const merchItems = [
      { id: 1, name: 'Bini Tote Bag', price: 200.00, image: require('../assets/bini_merch/1.png') },
      { id: 2, name: 'Bini Rounded Card', price: 120.00, image: require('../assets/bini_merch/2.png') },
      { id: 3, name: 'Bini Phone Case', price: 350.00, image: require('../assets/bini_merch/3.png') },
      { id: 4, name: 'Bini Kit', price: 400.00, image: require('../assets/bini_merch/4.png') },
      { id: 5, name: 'Bini Fan', price: 200.00, image: require('../assets/bini_merch/5.png') },
      { id: 6, name: 'Bini Cap', price: 270.00, image: require('../assets/bini_merch/6.png') },
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
          source={require('../assets/bini.jpg')}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={styles.image}
        />
        <Text style={styles.title}>BINI</Text>
        <Text style={styles.description}>BINI is an 8-member PPop girl group under Star Magic, ABS-CBN. They released their pre-debut single "Da Coconut Nut" on November 6th, 2020. BINI debuted on June 11, 2021, with their single "Born To Win"</Text>
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

  export default Bini;
