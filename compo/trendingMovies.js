import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb'; // Import the image500 function


const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Movie', { item }); // Navigate to 'Movie' screen with item details
  };

  //console.log('Data:', data); // Log the data to check if it contains the necessary information


  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 14, marginBottom: 5 }}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => < MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
};


const MovieCard = ({ item, handleClick }) => {
  //console.log('Item:', item); // Log the item to check if it has the poster_path property
  //console.log('Image URL:', image500(item.poster_path));

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20, // Rounded corners for the image
          }}
          className="rounded-3xl"
        />
        <Text style={{ color: 'white', marginTop: 10 }}>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}; 