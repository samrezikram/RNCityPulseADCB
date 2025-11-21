import axios from 'axios';
import { TICKETMASTER_API_KEY, TICKETMASTER_BASE_URL } from '../../config/env';

export type EventItem = {
  id: string;
  name: string;
  images: { url: string }[];
  dates?: { start?: { localDate?: string; localTime?: string } };
  _embedded?: {
    venues?: {
      name?: string;
      city?: { name?: string };
      country?: { name?: string };
      location?: { latitude?: string; longitude?: string };
    }[];
  };
};

export type EventSearchResponse = {
  _embedded?: {
    events: EventItem[];
  };
};

const client = axios.create({
  baseURL: TICKETMASTER_BASE_URL,
  timeout: 10000,
});

export const fetchEvents = async (keyword: string, city: string) => {
  if (!TICKETMASTER_API_KEY) {
    // API key missing, return empty, hook will swap in mocks
    return [];
  }

  const response = await client.get<EventSearchResponse>('/events.json', {
    params: {
      apikey: TICKETMASTER_API_KEY,
      keyword,
      city,
    },
  });

  return response.data._embedded?.events ?? [];
};