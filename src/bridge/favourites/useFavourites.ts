import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const FAV_KEY = 'cityPulse:favourites';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(FAV_KEY);
      if (raw) {
        setFavourites(JSON.parse(raw));
      }
    })();
  }, []);

  const persist = async (next: string[]) => {
    setFavourites(next);
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(next));
  };

  const toggleFavourite = async (id: string) => {
    const exists = favourites.includes(id);
    const next = exists ? favourites.filter(x => x !== id) : [...favourites, id];
    await persist(next);
  };

  const isFavourite = (id: string) => favourites.includes(id);

  return {
    favourites,
    toggleFavourite,
    isFavourite,
  };
};