import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import { fetchMoviedetails } from '../api/moviedb';
import { image500 } from '../api/moviedb'; // Import the image500 function
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../compo/movieList';


const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [movie, setMovie] = useState({});

  // Destructure item from route.params
  const { item } = route.params;

  useEffect(() => {
    if (item && item.id) {
      getMovieDetails(item.id);
    }
  }, [item]);

  const getMovieDetails = async (id) => {
    try {
      const data = await fetchMoviedetails(id);
      if (data) {
        setMovie(data);
      } else {
        console.error('Failed to fetch movie details');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{
      flex: 1, backgroundColor: 'grey',
    }}>

      <View style={{ width: '100%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background, { borderRadius: 10, padding: 4, position: 'absolute', zIndex: 20, top: 60, left: 16 }]}>
          <ChevronLeftIcon size="33" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={[styles.background, { borderRadius: 10, padding: 4, position: 'absolute', zIndex: 20, top: 60, right: 16 }]}>
          <HeartIcon size={40} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/w500' + movie?.poster_path }}
          style={{
            width: width,
            height: height * 0.55,
            // borderRadius: 40, // Rounded corners for the image
            // resizeMode: 'contain' // Görüntüyü orijinal boyutunu koruyarak görüntüle
          }}
          className="rounded-3xl"
        />
        <LinearGradient
          colors={['transparent', 'rgba(100,100,100,0.6)', 'rgba(100,100,100,1)']}
          style={{ position: 'absolute', bottom: 0, width: width, height: height * 0.4 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
      </View>


      {/* movie details */}
      <View style={{ marginTop: -(height * 0.04) + 40, paddingHorizontal: 16, paddingVertical: 20 }}>
        {/* title */}
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, fontStyle: 'italic', letterSpacing: 1 }}>
          {movie?.title}
        </Text>
        {/* release, status, time */}
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>
          {movie?.status} - {movie?.release_date ? movie.release_date.split('-')[0] : ''} - {movie?.runtime} min
        </Text>
        {/* genres */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 16, marginVertical: 8 }}>
          {movie.genres && movie.genres.map((genre, index) => (
            <Text key={index} style={{ color: 'white', fontWeight: '600', fontSize: 16, textAlign: 'center', marginHorizontal: 4 }}>
              {genre.name}
            </Text>
          ))}
        </View>
        {/* Description */}
        <Text style={{ color: 'white', marginHorizontal: 16, lineHeight: 20 }}>
          {movie?.overview}
        </Text>
      </View>

    </ScrollView>
  );
}