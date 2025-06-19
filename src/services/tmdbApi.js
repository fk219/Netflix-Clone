import axios from 'axios';

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Demo API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'w1280') => {
  if (!path) return 'https://images.pexels.com/photos/5662865/pexels-photo-5662865.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchTrending = async () => {
  try {
    const response = await tmdbApi.get('/trending/all/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
};

export const fetchPopular = async () => {
  try {
    const response = await tmdbApi.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular:', error);
    return [];
  }
};

export const fetchTopRated = async () => {
  try {
    const response = await tmdbApi.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated:', error);
    return [];
  }
};

export const fetchActionMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 28, // Action genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching action movies:', error);
    return [];
  }
};

export const fetchComedyMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 35, // Comedy genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching comedy movies:', error);
    return [];
  }
};

export const fetchHorrorMovies = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 27, // Horror genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching horror movies:', error);
    return [];
  }
};

export const fetchTVShows = async () => {
  try {
    const response = await tmdbApi.get('/tv/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
};

export const fetchDocumentaries = async () => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: 99, // Documentary genre ID
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching documentaries:', error);
    return [];
  }
};

export const searchContent = async (query) => {
  try {
    const response = await tmdbApi.get('/search/multi', {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getTVDetails = async (id) => {
  try {
    const response = await tmdbApi.get(`/tv/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching TV details:', error);
    return null;
  }
};