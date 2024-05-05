import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const progressBarWidth = 280;

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([
    { id: 1, title: 'Karera', source: require('../assets/bini_music/karera.mp3'), image: require('../assets/bini7.jpg'), duration: 288000 },
    { id: 2, title: 'Lagi', source: require('../assets/bini_music/lagi.mp3'), image: require('../assets/bini2.jpg'), duration: 242000 },
    { id: 3, title: 'Salamin', source: require('../assets/bini_music/salamin.mp3'), image: require('../assets/bini3.jpg'), duration: 209000 },
    { id: 4, title: 'Pantropiko', source: require('../assets/bini_music/pantropiko.mp3'), image: require('../assets/bini5.jpg'), duration: 196000 }
  ]);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);
  const positionIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(positionIntervalRef.current);
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      positionIntervalRef.current = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis || duration);
          setPosition(status.positionMillis || position);
          if (status.didJustFinish && !status.isLooping) setIsPlaying(false);
        }
      }, 100);
    }
    return () => clearInterval(positionIntervalRef.current);
  }, [sound]);

  async function playSound(index) {
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(songs[index].source, { shouldPlay: true });
      setSound(newSound);
      setIsPlaying(true);
      setCurrentSongIndex(index);
    } catch (error) { console.log('Error playing sound: ', error); }
  }

  async function stopSound() {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) { console.log('Error stopping sound: ', error); }
  }

  async function playNext() { await playSound((currentSongIndex + 1) % songs.length); }

  async function playPrevious() {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    await playSound(prevIndex);
  }

  async function seekToPosition(event) {
    const { locationX } = event.nativeEvent;
    const newPosition = (locationX / progressBarWidth) * (duration || 1);
    await sound.setPositionAsync(Math.min(newPosition, duration));
  }

  const getProgress = () => (!duration || duration === 0 || !position) ? 0 : (position / duration) * progressBarWidth;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => playSound(item.id - 1)} style={styles.queueItem}>
      <Image source={item.image} style={styles.queueItemImage} />
      <Text style={styles.queueItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={songs[currentSongIndex].image} style={styles.image} />
      </View>
      <Text style={styles.title}>{songs[currentSongIndex].title}</Text>
      <View style={styles.timeDurationContainer}>
        <Text style={styles.duration}>
          {duration ? `${Math.floor(position / 60000)}:${((position % 60000) / 1000).toFixed(0).padStart(2, '0')}` : '00:00'}
        </Text>
        <View style={styles.progressBarContainer}>
          <TouchableOpacity style={styles.progressBar} onPress={seekToPosition}>
            <View style={[styles.progressIndicator, { width: getProgress() }]} />
          </TouchableOpacity>
        </View>
        <Text style={styles.duration}>
          {duration ? `${Math.floor(duration / 60000)}:${((duration % 60000) / 1000).toFixed(0).padStart(2, '0')}` : '00:00'}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={playPrevious}>
          <Ionicons name="play-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={isPlaying ? stopSound : () => playSound(currentSongIndex)}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={playNext}>
          <Ionicons name="play-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.queueLabel}>Queue</Text>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.queueContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  imageContainer: { width: '100%', aspectRatio: 1, backgroundColor: 'lightgray', marginBottom: 20 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  timeDurationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '100%' },
  duration: { fontSize: 16, width: 60, textAlign: 'center' },
  progressBarContainer: { flex: 1, marginLeft: 10, marginRight: 10, height: 10 },
  progressBar: { height: 10, backgroundColor: 'lightgray', width: progressBarWidth },
  progressIndicator: { height: '100%', backgroundColor: 'black' },
  controls: { flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginBottom: 20 },
  controlButton: { backgroundColor: '#fff', padding: 10, borderRadius: 25 },
  queueContainer: { width: '100%', borderTopWidth: 1, borderTopColor: 'lightgray', paddingTop: 10, maxHeight: 200 },
  queueItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  queueItemImage: { width: 50, height: 50, marginRight: 10, resizeMode: 'cover', borderRadius: 5 },
  queueItemTitle: { fontSize: 18 },
  queueLabel: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
