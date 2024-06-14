import axios from 'axios';
import { apiKey } from '../constants';

// endpoints
const trendingME = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
const upcomingME = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
const topratedME = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailE = id => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return {};
  }
};

export const fetchTrending = () => {
  return apiCall(trendingME);
};

export const fetchUpcoming = () => {
  return apiCall(upcomingME);
};

export const fetchToprated = () => {
  return apiCall(topratedME);
};

export const fetchMoviedetails = id => {
  return apiCall(movieDetailE(id));
};
