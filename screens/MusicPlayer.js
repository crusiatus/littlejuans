import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MusicPlayer = ({ navigation }) => {
  // Mock data for albums
  const albums = [
    { id: 1, artist: 'SB19', album: 'Get in the Zone', cover: require('../assets/sb19.jpg') },
    { id: 2, artist: 'BINI', album: 'Da Coconut Nut', cover: require('../assets/bini.jpg') }
  ];

  const handleAlbumPress = (artist) => {
    if (artist === 'SB19') {
      navigation.navigate('SB19MusicPlayer');
    } else if (artist === 'BINI') {
      navigation.navigate('BINIMusicPlayer');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {albums.map((album) => (
        <TouchableOpacity key={album.id} onPress={() => handleAlbumPress(album.artist)}>
          <View style={styles.albumContainer}>
            <Image source={album.cover} style={styles.albumCover} />
            <Text style={styles.artistName}>{album.artist}</Text>
            <Text style={styles.albumName}>{album.album}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  albumContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  albumCover: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  albumName: {
    fontSize: 16,
    color: '#555',
  },
});

export default MusicPlayer;
