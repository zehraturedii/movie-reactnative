import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { getAuth } from "firebase/auth";
import firebase from '../firebase';
import TrendingMovies from '../compo/trendingMovies';
import MovieList from '../compo/movieList';
import { styles } from '../theme'; // Import the styles from themes
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchToprated, fetchTrending, fetchUpcoming } from '../api/moviedb';

const auth = getAuth(firebase);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [toprated, setToprated] = useState([]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch(error => alert(error.message));
  };

  useEffect(() => {
    getTrending();
    getUpcoming();
    getToprated();
  }, []);

  const getTrending = async () => {
    const data = await fetchTrending();
    if (data && data.results) {
      setTrending(data.results);
    } else {
      console.error('Failed to fetch trending data');
    }
  };

  const getUpcoming = async () => {
    const data = await fetchUpcoming();
    if (data && data.results) {
      setUpcoming(data.results);
    } else {
      console.error('Failed to fetch upcoming data');
    }
  };

  const getToprated = async () => {
    const data = await fetchToprated();
    if (data && data.results) {
      setToprated(data.results);
    } else {
      console.error('Failed to fetch toprated data');
    }
  };

  const backgroundColor = styles.container.backgroundColor; // Get the background color from the theme

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, paddingTop: 20 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
          {toprated.length > 0 && <MovieList title="Top Rated" data={toprated} />}
        </ScrollView>

        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
