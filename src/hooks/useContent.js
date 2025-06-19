import { useState, useEffect } from 'react';
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchTVShows,
  fetchDocumentaries,
} from '../services/tmdbApi';

export const useContent = () => {
  const [content, setContent] = useState({
    trending: [],
    popular: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    tvShows: [],
    documentaries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const [
          trending,
          popular,
          topRated,
          action,
          comedy,
          horror,
          tvShows,
          documentaries,
        ] = await Promise.all([
          fetchTrending(),
          fetchPopular(),
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies(),
          fetchHorrorMovies(),
          fetchTVShows(),
          fetchDocumentaries(),
        ]);

        setContent({
          trending,
          popular,
          topRated,
          action,
          comedy,
          horror,
          tvShows,
          documentaries,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return { content, loading, error };
};