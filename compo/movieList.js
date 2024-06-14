// MovieList.js

import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function MovieList({ title, data }) {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('Movie', { item });
  };

  return (
    <View className="mb-8 space-y-4" >
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
      </View>
      {/*movie row*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => handlePress(item)}>
            <View className=" space-y-1 mr-4">
              <Image
                source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }}
                className="rounded-3xl"
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className="text-Neutral-300 ml-1">
                {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
